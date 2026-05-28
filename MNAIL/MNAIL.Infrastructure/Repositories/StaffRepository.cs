using Microsoft.EntityFrameworkCore;
using MNAIL.Domain.Entities;
using MNAIL.Domain.Interfaces;
using MNAIL.Infrastructure.Data;

namespace MNAIL.Infrastructure.Repositories;

public class StaffRepository : IStaffRepository
{
    private readonly AppDbContext _db;

    public StaffRepository(AppDbContext db)
    {
        _db = db;
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
}