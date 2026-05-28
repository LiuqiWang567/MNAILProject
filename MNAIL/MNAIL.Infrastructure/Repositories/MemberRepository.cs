using Microsoft.EntityFrameworkCore;
using MNAIL.Domain.Entities;
using MNAIL.Domain.Interfaces;
using MNAIL.Infrastructure.Data;

namespace MNAIL.Infrastructure.Repositories;

public class MemberRepository : IMemberRepository
{
    private readonly AppDbContext _db;

    public MemberRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Member>> GetAllAsync()
    {
        return await _db.Members.ToListAsync();
    }

    public async Task<Member?> GetByIdAsync(int id)
    {
        return await _db.Members.FindAsync(id);
    }

    public async Task<Member?> GetByPhoneAsync(string phone)
    {
        return await _db.Members.FirstOrDefaultAsync(m => m.Phone == phone);
    }

    public async Task AddAsync(Member member)
    {
        await _db.Members.AddAsync(member);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Member member)
    {
        _db.Members.Update(member);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(Member member)
    {
        _db.Members.Remove(member);
        await _db.SaveChangesAsync();
    }

    public async Task<bool> ExistsByPhoneAsync(string phone)
    {
        return await _db.Members.AnyAsync(m => m.Phone == phone);
    }
}