using MNAIL.Application.DTOs;

namespace MNAIL.Application.Interfaces;

public interface INailServiceService
{
    Task<NailServiceDto?> GetByIdAsync(int id);
    Task<List<NailServiceDto>> GetAllAsync();
    Task AddAsync(CreateNailServiceDto dto);
    Task UpdateAsync(int id, UpdateNailServiceDto dto);
    Task DeleteAsync(int id);
}