using Microsoft.AspNetCore.Mvc;
using MNAIL.Application.DTOs;
using MNAIL.Application.Interfaces;
using MNAIL.Core.Models;

namespace MNAIL.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomersController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    /// <summary>
    /// 获取所有顾客
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<CustomerDto>>>> GetAll()
    {
        var data = await _customerService.GetAllAsync();
        return ApiResponse<List<CustomerDto>>.SuccessResult(data);
    }

    /// <summary>
    /// 根据ID获取单个顾客
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ApiResponse<CustomerDto>>> GetById(int id)
    {
        var data = await _customerService.GetByIdAsync(id);
        if (data == null)
            return NotFound(ApiResponse<CustomerDto>.FailResult("顾客不存在"));

        return ApiResponse<CustomerDto>.SuccessResult(data);
    }

    /// <summary>
    /// 新增顾客
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ApiResponse<string>>> Create(CreateCustomerDto dto)
    {
        await _customerService.AddAsync(dto);
        return ApiResponse<string>.SuccessResult(null, "顾客创建成功");
    }

    /// <summary>
    /// 更新顾客
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<ApiResponse<string>>> Update(int id, UpdateCustomerDto dto)
    {
        try
        {
            await _customerService.UpdateAsync(id, dto);
            return ApiResponse<string>.SuccessResult(null, "顾客更新成功");
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ApiResponse<string>.FailResult(ex.Message));
        }
    }

    /// <summary>
    /// 删除顾客
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<string>>> Delete(int id)
    {
        await _customerService.DeleteAsync(id);
        return ApiResponse<string>.SuccessResult(null, "顾客删除成功");
    }
}