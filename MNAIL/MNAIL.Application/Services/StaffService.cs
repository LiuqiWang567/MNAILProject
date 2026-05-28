using Microsoft.Extensions.Configuration;
using MNAIL.Application.DTOs;
using MNAIL.Application.Interfaces;
using MNAIL.Core.Exceptions;
using MNAIL.Core.Helpers;
using MNAIL.Domain.Entities;
using MNAIL.Domain.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace MNAIL.Application.Services;

public class StaffService : IStaffService
{
    private readonly IStaffRepository _repo;
    private readonly IConfiguration _config;

    public StaffService(IStaffRepository repo, IConfiguration config)
    {
        _repo = repo;
        _config = config;
    }

    public async Task RegisterAsync(StaffDto dto, string password)
    {
        if (await _repo.ExistsByUsernameAsync(dto.Username))
            throw new BusinessException("用户名已存在");

        var staff = new Staff
        {
            Username = dto.Username,
            Name = dto.Name,
           Password = PasswordHelper.Hash(password), // 哈希
          
            IsAdmin = dto.IsAdmin
        };

        await _repo.AddAsync(staff);
    }

    public async Task<string> LoginAsync(LoginDto dto)
    {
        var staff = await _repo.GetByUsernameAsync(dto.Username);
        if (staff == null)
            throw new BusinessException("账号不存在");

        if (!PasswordHelper.Verify(dto.Password, staff.Password))
            throw new BusinessException("密码错误");

        // 生成JWT
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, staff.Username),
            new Claim(ClaimTypes.NameIdentifier, staff.Id.ToString()),
            new Claim(ClaimTypes.Role, staff.IsAdmin ? "Admin" : "Staff")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(_config["Jwt:ExpiresMinutes"])),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<List<Staff>> GetAllAsync()
    {
        return await _repo.GetAllAsync();
    }

    public async Task<Staff?> GetByIdAsync(int id)
    {
        return await _repo.GetByIdAsync(id);
    }

    public async Task<Staff?> GetByUsernameAsync(string username)
    {
        return await _repo.GetByUsernameAsync(username);
    }

    public async Task UpdateAsync(int id, StaffDto dto)
    {
        var staff = await _repo.GetByIdAsync(id);
        if (staff == null)
            throw new BusinessException("员工不存在");

        staff.Username = dto.Username;
        staff.Name = dto.Name;
        staff.Phone = dto.Phone;
        staff.IsAdmin = dto.IsAdmin;

        await _repo.UpdateAsync(staff);
    }

    public async Task DeleteAsync(int id)
    {
        var staff = await _repo.GetByIdAsync(id);
        if (staff == null)
            throw new BusinessException("员工不存在");

        await _repo.DeleteAsync(staff);
    }
}