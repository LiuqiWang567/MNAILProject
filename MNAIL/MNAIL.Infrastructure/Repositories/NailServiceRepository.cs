using Microsoft.EntityFrameworkCore;
using MNAIL.Domain.Entities;
using MNAIL.Domain.Interfaces;
using MNAIL.Infrastructure.Data;

namespace MNAIL.Infrastructure.Repositories;

public class NailServiceRepository : INailServiceRepository
{
    private readonly AppDbContext _db;

    public NailServiceRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<NailService?> GetByIdAsync(int id)
    {
        return await _db.NailServices.FindAsync(id);
    }

    public async Task<List<NailService>> GetAllAsync()
    {
        return await _db.NailServices.ToListAsync();
    }

    public async Task AddAsync(NailService service)
    {
        await _db.NailServices.AddAsync(service);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(NailService service)
    {
        _db.NailServices.Update(service);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var service = await _db.NailServices.FindAsync(id);
        if (service != null)
        {
            _db.NailServices.Remove(service);
            await _db.SaveChangesAsync();
        }
    }
}