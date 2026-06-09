using System;
using System.Collections.Generic;
using System.Text;

namespace MNAIL.Application.DTOs
{
    public class ServiceItemDto
    {
        public string Name { get; set; } = "";
        public required string ShopId { get; set; }
        public string Category { get; set; } = "";
        public decimal Price { get; set; }
        public int Duration { get; set; }
        public string? Remark { get; set; }
        public bool IsEnabled { get; set; }
    }
}
