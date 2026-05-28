using Microsoft.EntityFrameworkCore;
using MNAIL.Domain.Entities;
using MNAIL.Domain.Interfaces;
using MNAIL.Infrastructure.Data;

namespace MNAIL.Infrastructure.Repositories;

public class ServiceItemRepository : IServiceItemRepository
{
    private readonly AppDbContext _db;
    public ServiceItemRepository(AppDbContext db) => _db = db;

    public async Task<List<ServiceItem>> GetAllAsync(bool? isEnabled = null)
    {
        var query = _db.ServiceItems.AsQueryable();
        if (isEnabled.HasValue)
            query = query.Where(x => x.IsEnabled == isEnabled.Value);
        return await query.ToListAsync();
    }

    public async Task<ServiceItem?> GetByIdAsync(int id)
    {
        return await _db.ServiceItems.FindAsync(id);
    }

    public async Task AddAsync(ServiceItem item)
    {
        await _db.ServiceItems.AddAsync(item);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(ServiceItem item)
    {
        _db.ServiceItems.Update(item);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(ServiceItem item)
    {
        _db.ServiceItems.Remove(item);
        await _db.SaveChangesAsync();
    }

    public async Task<bool> ExistsByNameAsync(string name, int? excludeId = null)
    {
        var query = _db.ServiceItems.Where(x => x.Name == name);
        if (excludeId.HasValue)
            query = query.Where(x => x.Id != excludeId.Value);
        return await query.AnyAsync();
    }
}