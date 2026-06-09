namespace MNAIL.Domain.Entities;

public class Staff
{
    public int Id { get; set; }

    public required string ShopId {  get; set; }
    public required string Username { get; set; } // 登录账号
    public required string Password { get; set; } // 密码
    public  string? Name { get; set; } // 真实姓名

    public string? Phone { get; set; }

    public string? Position { get; set; }//技师，店长，收银

    public string? Skills { get; set; }//擅长项目

    public string? Avatar { get; set; }//头像
    public bool IsAdmin { get; set; } = false; // 是否管理员

    public bool Status { get; set; }

    public DateTime CreateTime { get; set; } = DateTime.Now;
}