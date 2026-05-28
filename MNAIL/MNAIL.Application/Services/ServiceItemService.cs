using MNAIL.Application.DTOs;
using MNAIL.Application.Interfaces;
using MNAIL.Domain.Entities;
using MNAIL.Domain.Interfaces;
using MNAIL.Infrastructure.Repositories;

namespace MNAIL.Application.Services;

public class ServiceItemService : IServiceItemService
{
    private readonly IServiceItemRepository _repo;
    public ServiceItemService(IServiceItemRepository repo) => _repo = repo;

    public async Task<List<ServiceItem>> GetListAsync(bool? isEnabled = null)
    {
        return await _repo.GetAllAsync(isEnabled);
    }

    public async Task<ServiceItem> GetByIdAsync(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) throw new Exception("服务项目不存在");
        return item;
    }

    public async Task CreateAsync(ServiceItemDto dto)
    {
        if (await _repo.ExistsByNameAsync(dto.Name))
            throw new Exception("项目名称已存在");

        var item = new ServiceItem
        {
            Name = dto.Name,
            Category = dto.Category,
            Price = dto.Price,
            Duration = dto.Duration,
            Remark = dto.Remark,
            IsEnabled = dto.IsEnabled
        };
        await _repo.AddAsync(item);
    }

    public async Task UpdateAsync(int id, ServiceItemDto dto)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) throw new Exception("服务项目不存在");

        if (await _repo.ExistsByNameAsync(dto.Name, id))
            throw new Exception("项目名称已存在");

        item.Name = dto.Name;
        item.Category = dto.Category;
        item.Price = dto.Price;
        item.Duration = dto.Duration;
        item.Remark = dto.Remark;
        item.IsEnabled = dto.IsEnabled;

        await _repo.UpdateAsync(item);
    }

    public async Task DeleteAsync(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) throw new Exception("服务项目不存在");
        await _repo.DeleteAsync(item);
    }
}