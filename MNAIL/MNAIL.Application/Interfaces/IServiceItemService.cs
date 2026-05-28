using MNAIL.Application.DTOs;
using MNAIL.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MNAIL.Application.Interfaces
{
    public interface IServiceItemService
    {
        Task<List<ServiceItem>> GetListAsync(bool? isEnabled = null);
        Task<ServiceItem> GetByIdAsync(int id);
        Task CreateAsync(ServiceItemDto dto);
        Task UpdateAsync(int id, ServiceItemDto dto);
        Task DeleteAsync(int id);
    }
}
