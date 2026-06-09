using Dapper;
using Microsoft.EntityFrameworkCore;
using MNAIL.Domain.Entities;
using MNAIL.Domain.Interfaces;
using MNAIL.Infrastructure.Data;
using System.Data;

namespace MNAIL.Infrastructure.Repositories;

public class StaffRepository : IStaffRepository
{
    private readonly AppDbContext _db;
    private readonly IDbConnection _dbConnection;
    // 同时注入 EF Context 和 Dapper 连接
    public StaffRepository(AppDbContext db, IDbConnection dbConnection)
    {
        _db = db;
        _dbConnection = dbConnection;
    }

    public async Task<Staff?> GetByUsernameAsync(string username)
    {
        return await _db.Staffs.FirstOrDefaultAsync(x => x.Username == username);
    }

    public async Task AddAsync(Staff staff)
    {
        await _db.Staffs.AddAsync(staff);
        await _db.SaveChangesAsync();
    }

    public async Task<bool> ExistsByUsernameAsync(string username)
    {
        return await _db.Staffs.AnyAsync(x => x.Username == username);
    }

    // ========== 下面是补全的四个方法 ==========

    public async Task<List<Staff>> GetAllAsync()
    {
        return await _db.Staffs.ToListAsync();
    }

    public async Task<Staff?> GetByIdAsync(int id)
    {
        return await _db.Staffs.FindAsync(id);
    }

    public async Task UpdateAsync(Staff staff)
    {
        _db.Staffs.Update(staff);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(Staff staff)
    {
        _db.Staffs.Remove(staff);
        await _db.SaveChangesAsync();
    }

    public async Task<Staff?> GetByShopIdAsync(string ShopId)
    {
        var sql = "SELECT * FROM Staffs WHERE ShopId = @Id";
        return await _dbConnection.QueryFirstOrDefaultAsync<Staff>(sql, new { Id = ShopId });

    }
}