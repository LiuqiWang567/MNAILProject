using MNAIL.Domain.Entities;

namespace MNAIL.Domain.Interfaces;

public interface INailServiceRepository
{
    Task<NailService?> GetByIdAsync(int id);
    Task<List<NailService>> GetAllAsync();
    Task AddAsync(NailService service);
    Task UpdateAsync(NailService service);
    Task DeleteAsync(int id);
}