namespace MNAIL.Application.DTOs;

public class NailServiceDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public decimal Price { get; set; }
    public int DurationMinutes { get; set; }
}

public class CreateNailServiceDto
{
    public required string Name { get; set; }
    public decimal Price { get; set; }
    public int DurationMinutes { get; set; }
}

public class UpdateNailServiceDto
{
    public required string Name { get; set; }
    public decimal Price { get; set; }
    public int DurationMinutes { get; set; }
}