using System;

namespace MNAIL.Domain.Entities;

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public DateTime? LastServiceDate { get; set; }
}