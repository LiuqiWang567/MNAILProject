using Dapper;
using Microsoft.EntityFrameworkCore;
using MNAIL.Domain.Entities;
using MNAIL.Infrastructure.Data;
using System.Data;

namespace MNAIL.Infrastructure.Repositories;

public class ServiceItemRepository : IServiceItemRepository
{
    private readonly AppDbContext _db;
    private readonly IDbConnection _dbConnection;
    // 同时注入 EF Context 和 Dapper 连接
    public ServiceItemRepository(AppDbContext db, IDbConnection dbConnection)
    {
        _db = db;
        _dbConnection = dbConnection;
    }
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

    public async Task<ServiceItem?> GetByShopIdAsync(string ShopId)
    {
        return await _db.ServiceItems.FindAsync(ShopId);
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
        var query = _db.ServiceItems.Where(x => x.ItemName == name);
        if (excludeId.HasValue)
            query = query.Where(x => x.Id != excludeId.Value);
        return await query.AnyAsync();
    }

    public async Task UpdateSericeItemAsync(ServiceItem item)
    {
        var sql = @"UPDATE ServiceItems 
                SET 
                    ItemName = @ItemName,
                    Price = @Price,
                    Duration = @Duration,
IsEnabled = @IsEnabled, 
                    Remark = @Remark      
                WHERE Id = @Id";

        // Dapper 自动映射 item 对象的属性到 SQL 参数
        await _dbConnection.ExecuteAsync(sql, item);
    }
}