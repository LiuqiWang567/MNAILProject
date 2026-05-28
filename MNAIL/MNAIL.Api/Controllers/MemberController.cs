using Microsoft.AspNetCore.Mvc;
using MNAIL.Application.Interfaces;
using MNAIL.Domain.Entities;

namespace MNAIL.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MemberController : ControllerBase
{
    private readonly IMemberService _service;

    public MemberController(IMemberService service)
    {
        _service = service;
    }

    /// <summary>
    /// 获取所有会员
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<Member>>> GetAll()
    {
        var list = await _service.GetAllAsync();
        return Ok(list);
    }

    /// <summary>
    /// 按ID获取会员
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Member>> GetById(int id)
    {
        var m = await _service.GetByIdAsync(id);
        if (m == null) return NotFound("会员不存在");
        return Ok(m);
    }

    /// <summary>
    /// 按手机号查询
    /// </summary>
    [HttpGet("phone/{phone}")]
    public async Task<ActionResult<Member>> GetByPhone(string phone)
    {
        var m = await _service.GetByPhoneAsync(phone);
        if (m == null) return NotFound("未找到该手机号会员");
        return Ok(m);
    }

    /// <summary>
    /// 新增会员
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create(Member member)
    {
        var msg = await _service.CreateAsync(member);
        if (msg != "新增成功")
            return BadRequest(new { message = msg });

        return CreatedAtAction(nameof(GetById), new { id = member.Id }, new { message = msg });
    }

    /// <summary>
    /// 修改会员
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Member member)
    {
        if (id != member.Id) return BadRequest("ID不匹配");

        var msg = await _service.UpdateAsync(member);
        if (msg != "更新成功")
            return BadRequest(new { message = msg });

        return Ok(new { message = msg });
    }

    /// <summary>
    /// 删除会员
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var msg = await _service.DeleteAsync(id);
        if (msg != "删除成功")
            return BadRequest(new { message = msg });

        return Ok(new { message = msg });
    }
}