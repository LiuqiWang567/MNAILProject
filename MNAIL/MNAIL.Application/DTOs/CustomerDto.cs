namespace MNAIL.Application.DTOs;

// 查询/返回用
public class CustomerDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Phone { get; set; }
    public DateTime? LastServiceDate { get; set; }
}

// 新增/更新用（可选，也可以直接用同一个Dto）
public class CreateCustomerDto
{
    public required string Name { get; set; }
    public required string Phone { get; set; }
}

public class UpdateCustomerDto
{
    public required string Name { get; set; }
    public required string Phone { get; set; }
    public DateTime? LastServiceDate { get; set; }
}