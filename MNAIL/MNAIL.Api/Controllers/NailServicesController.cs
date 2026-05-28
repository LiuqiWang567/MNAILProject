using Microsoft.AspNetCore.Mvc;
using MNAIL.Application.DTOs;
using MNAIL.Application.Interfaces;
using MNAIL.Core.Models;

namespace MNAIL.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NailServicesController : ControllerBase
{
    private readonly INailServiceService _service;

    public NailServicesController(INailServiceService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<NailServiceDto>>>> GetAll()
    {
        var data = await _service.GetAllAsync();
        return ApiResponse<List<NailServiceDto>>.SuccessResult(data);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<NailServiceDto>>> Get(int id)
    {
        var data = await _service.GetByIdAsync(id);
        if (data == null)
            return NotFound(ApiResponse<NailServiceDto>.FailResult("服务不存在"));

        return ApiResponse<NailServiceDto>.SuccessResult(data);
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<string>>> Create(CreateNailServiceDto dto)
    {
        await _service.AddAsync(dto);
        return ApiResponse<string>.SuccessResult(null, "创建成功");
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<string>>> Update(int id, UpdateNailServiceDto dto)
    {
        try
        {
            await _service.UpdateAsync(id, dto);
            return ApiResponse<string>.SuccessResult(null, "更新成功");
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ApiResponse<string>.FailResult(ex.Message));
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return ApiResponse<string>.SuccessResult(null, "删除成功");
    }
}