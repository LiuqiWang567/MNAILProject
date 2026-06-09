namespace MNAIL.Application.DTOs;

public class StaffDto
{
    public string Username { get; set; } = "";
    public required string ShopId { get; set; }
    public string Name { get; set; } = "";
    public string? Position { get; set; }//技师，店长，收银

    public string? Skills { get; set; }//擅长项目

    public string? Avatar { get; set; }//头像
    public bool IsAdmin { get; set; } = false; // 是否管理员

    public bool Status { get; set; }
}