using System;
using System.Collections.Generic;
using System.Text;

namespace MNAIL.Domain.Entities
{
    public class ServiceItem
    {
        public int Id { get; set; }

        public required string ShopId { get; set; }
        // 项目名称（如：纯色美甲、延长甲、睫毛嫁接）
        public string ItemName { get; set; } = "";
        // 分类（美甲/美睫/手足护理/其他）
        public string Category { get; set; } = "";
        // 单价
        public decimal Price { get; set; }
        // 时长（分钟）
        public int Duration { get; set; }
        // 简介/备注
        public string? Remark { get; set; }
        // 是否启用
        public bool IsEnabled { get; set; } = true;
        public DateTime CreateTime { get; set; } = DateTime.Now;
    }
}
