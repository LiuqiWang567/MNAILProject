using System;

namespace MNAIL.Domain.Entities;

public class Customer
{
    public int Id { get; set; }
    public required string OpenId { get; set; }

    public string? Username { get; set; }
    public  string? NickName { get; set; }
    public  string? Phone { get; set; }
    public  string? Avatar { get; set; }
    public DateTime? LastServiceDate { get; set; }
}