namespace MNAIL.Domain.Entities;

public class Staff
{
    public int Id { get; set; }
    public required string Username { get; set; } // 登录账号
    public required string Password { get; set; } // 密码
    public required string Name { get; set; } // 真实姓名

    public string? Phone { get; set; }
    public bool IsAdmin { get; set; } = false; // 是否管理员

    public DateTime CreateTime { get; set; } = DateTime.Now;
}