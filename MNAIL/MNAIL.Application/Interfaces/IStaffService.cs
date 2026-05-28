using MNAIL.Application.DTOs;
using MNAIL.Domain.Entities;

namespace MNAIL.Application.Interfaces;

public interface IStaffService
{
    Task<string> LoginAsync(LoginDto dto);
    Task RegisterAsync(StaffDto dto, string password);

    Task<List<Staff>> GetAllAsync();
    Task<Staff?> GetByIdAsync(int id);

    Task<Staff?> GetByUsernameAsync(string username);
    Task UpdateAsync(int id, StaffDto dto);
    Task DeleteAsync(int id);
}