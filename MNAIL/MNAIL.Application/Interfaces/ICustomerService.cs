using MNAIL.Application.DTOs;
using System.Threading.Tasks;

namespace MNAIL.Application.Interfaces;

public interface ICustomerService
{
    Task<CustomerDto?> GetByIdAsync(int id);
    Task<List<CustomerDto>> GetAllAsync();
    Task AddAsync(CreateCustomerDto dto);
    Task UpdateAsync(int id, UpdateCustomerDto dto);
    Task DeleteAsync(int id);
}