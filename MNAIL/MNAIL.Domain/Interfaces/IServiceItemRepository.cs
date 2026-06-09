using MNAIL.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MNAIL.Infrastructure.Repositories
{
    public interface IServiceItemRepository
    {
        Task<List<ServiceItem>> GetAllAsync(bool? isEnabled = null);
        Task<ServiceItem?> GetByIdAsync(int id);

        Task<ServiceItem?> GetByShopIdAsync(string ShopId);
        Task AddAsync(ServiceItem item);
        Task UpdateAsync(ServiceItem item);

        Task UpdateSericeItemAsync(ServiceItem item);
        Task DeleteAsync(ServiceItem item);
        Task<bool> ExistsByNameAsync(string name, int? excludeId = null);
    }
}
