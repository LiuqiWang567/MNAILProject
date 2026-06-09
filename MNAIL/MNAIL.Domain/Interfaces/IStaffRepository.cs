using MNAIL.Domain.Entities;

namespace MNAIL.Domain.Interfaces;

public interface IStaffRepository
{
    Task<Staff?> GetByUsernameAsync(string username);

    Task<bool> ExistsByUsernameAsync(string username);
    Task AddAsync(Staff staff);

    Task<List<Staff>> GetAllAsync();
    Task<Staff?> GetByIdAsync(int id);

    Task<Staff?> GetByShopIdAsync(string ShopId);

    Task UpdateAsync(Staff staff);
    Task DeleteAsync(Staff staff);
}