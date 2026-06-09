using MNAIL.Application.DTOs;
using MNAIL.Application.Interfaces;
using MNAIL.Domain.Entities;
using MNAIL.Domain.Interfaces;

namespace MNAIL.Application.Services;

public class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _repository;

    public CustomerService(ICustomerRepository repository)
    {
        _repository = repository;
    }

    public async Task<CustomerDto?> GetByIdAsync(int id)
    {
        var customer = await _repository.GetByIdAsync(id);
        if (customer == null) return null;

        return new CustomerDto
        {
            Id = customer.Id,
            Name = customer.NickName,
            Phone = customer.Phone,
            LastServiceDate = customer.LastServiceDate
        };
    }

    public async Task<List<CustomerDto>> GetAllAsync()
    {
        var customers = await _repository.GetAllAsync();
        return customers.Select(c => new CustomerDto
        {
            Id = c.Id,
            Name = c.NickName,
            Phone = c.Phone,
            LastServiceDate = c.LastServiceDate
        }).ToList();
    }

    public async Task AddAsync(CreateCustomerDto dto)
    {
        var customer = new Customer
        {
            NickName = dto.Name,
            OpenId=dto.OpenId,
            Phone = dto.Phone
            
        };
        await _repository.AddAsync(customer);
    }

    public async Task UpdateAsync(int id, UpdateCustomerDto dto)
    {
        var customer = await _repository.GetByIdAsync(id);
        if (customer == null)
            throw new KeyNotFoundException("顾客不存在");

        customer.NickName = dto.Name;
        customer.Phone = dto.Phone;
        customer.LastServiceDate = dto.LastServiceDate;

        await _repository.UpdateAsync(customer);
    }

    public async Task DeleteAsync(int id)
    {
        await _repository.DeleteAsync(id);
    }
}