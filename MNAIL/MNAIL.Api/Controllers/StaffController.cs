using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MNAIL.Application.DTOs;
using MNAIL.Application.Interfaces;
using MNAIL.Application.Services;
using MNAIL.Core.Models;

namespace MNAIL.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StaffController : ControllerBase
{
    private readonly IStaffService _service;

    public StaffController(IStaffService service)
    {
        _service = service;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<string>>> Login(LoginDto dto)
    {
        var token = await _service.LoginAsync(dto);
        return ApiResponse<string>.SuccessResult(token);
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult<ApiResponse<string>>> Register(StaffDto dto, string password)
    {
        await _service.RegisterAsync(dto, password);
        return ApiResponse<string>.SuccessResult(null, "创建成功");
    }
    // 示例：需要登录才能访问的接口
    [Authorize]
    [HttpGet("test")]
    public ActionResult<ApiResponse<string>> Test()
    {
        return ApiResponse<string>.SuccessResult("登录成功！可以访问需要权限的接口");
    }
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        var list = await _service.GetAllAsync();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var staff = await _service.GetByIdAsync(id);
        if (staff == null) return NotFound("员工不存在");
        return Ok(staff);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]

    public async Task<IActionResult> Update(int id, StaffDto dto)
    {
        await _service.UpdateAsync(id, dto);
        return Ok("修改成功");
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]

    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return Ok("删除成功");
    }

}