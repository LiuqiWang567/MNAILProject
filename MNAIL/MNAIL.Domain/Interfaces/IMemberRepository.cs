using MNAIL.Domain.Entities;

namespace MNAIL.Domain.Interfaces;

public interface IMemberRepository
{
    Task<List<Member>> GetAllAsync();
    Task<Member?> GetByIdAsync(int id);
    Task<Member?> GetByPhoneAsync(string phone);
    Task AddAsync(Member member);
    Task UpdateAsync(Member member);
    Task DeleteAsync(Member member);
    Task<bool> ExistsByPhoneAsync(string phone);
}