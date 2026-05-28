namespace MNAIL.Application.DTOs;

public class StaffDto
{
    public string Username { get; set; } = "";
    public string Name { get; set; } = "";
    public string? Phone { get; set; }
    public bool IsAdmin { get; set; }
}