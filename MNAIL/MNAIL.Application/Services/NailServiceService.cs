using MNAIL.Application.DTOs;
using MNAIL.Application.Interfaces;
using MNAIL.Domain.Entities;
using MNAIL.Domain.Interfaces;

namespace MNAIL.Application.Services;

public class NailServiceService : INailServiceService
{
    private readonly INailServiceRepository _repository;

    public NailServiceService(INailServiceRepository repository)
    {
        _repository = repository;
    }

    public async Task<NailServiceDto?> GetByIdAsync(int id)
    {
        var data = await _repository.GetByIdAsync(id);
        if (data == null) return null;

        return new NailServiceDto
        {
            Id = data.Id,
            Name = data.Name,
            Price = data.Price,
            DurationMinutes = data.DurationMinutes
        };
    }

    public async Task<List<NailServiceDto>> GetAllAsync()
    {
        var list = await _repository.GetAllAsync();
        return list.Select(x => new NailServiceDto
        {
            Id = x.Id,
            Name = x.Name,
            Price = x.Price,
            DurationMinutes = x.DurationMinutes
        }).ToList();
    }

    public async Task AddAsync(CreateNailServiceDto dto)
    {
        var entity = new NailService
        {
            Name = dto.Name,
            Price = dto.Price,
            DurationMinutes = dto.DurationMinutes
        };
        await _repository.AddAsync(entity);
    }

    public async Task UpdateAsync(int id, UpdateNailServiceDto dto)
    {
        var entity = await _repository.GetByIdAsync(id);
        if (entity == null)
            throw new KeyNotFoundException("美甲服务不存在");

        entity.Name = dto.Name;
        entity.Price = dto.Price;
        entity.DurationMinutes = dto.DurationMinutes;

        await _repository.UpdateAsync(entity);
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }
}