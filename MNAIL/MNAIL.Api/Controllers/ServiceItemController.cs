using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MNAIL.Application.DTOs;
using MNAIL.Application.Interfaces;
using MNAIL.Application.Services;

namespace MNAIL.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ServiceItemController : ControllerBase
{
    private readonly IServiceItemService _service;
    public ServiceItemController(IServiceItemService service) => _service = service;

    // 获取所有项目（可过滤启用状态）
    [HttpGet]
    public async Task<IActionResult> GetList([FromQuery] bool? isEnabled)
    {
        var list = await _service.GetListAsync(isEnabled);
        return Ok(list);
    }

    // 单个项目详情
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);
        return Ok(item);
    }

    // 新增项目（仅管理员）
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create(ServiceItemDto dto)
    {
        await _service.CreateAsync(dto);
        return Ok("创建成功");
    }

    // 修改项目（仅管理员）
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, ServiceItemDto dto)
    {
        await _service.UpdateAsync(id, dto);
        return Ok("修改成功");
    }

    // 删除项目（仅管理员）
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return Ok("删除成功");
    }
}