using Microsoft.EntityFrameworkCore;
using MNAIL.Domain.Entities;
using MNAIL.Domain.Interfaces;
using MNAIL.Infrastructure.Data;
using System.Threading.Tasks;

namespace MNAIL.Infrastructure.Repositories;

//这里是和数据库打交道的地方
public class CustomerRepository : ICustomerRepository
{
    private readonly AppDbContext _db;

    public CustomerRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Customer?> GetByIdAsync(int id)
    {
        return await _db.Customers.FindAsync(id);
        // 参数化查询，防SQL注入
        //return await _db.Customers
        //    .FromSqlRaw("SELECT * FROM Customers WHERE Id = {0}", id)
        //    .FirstOrDefaultAsync();
    }

    public async Task<List<Customer>> GetAllAsync()
    {
        return await _db.Customers.ToListAsync();
        //查询全部（原生 SQL）
        //return await _db.Customers
        //     .FromSqlRaw("SELECT * FROM Customers")
        //     .ToListAsync();
    }
    public async Task AddAsync(Customer customer)
    {
        await _db.Customers.AddAsync(customer);
        await _db.SaveChangesAsync();
        // 写 INSERT 语句，参数化
        //await _db.Database.ExecuteSqlRawAsync(
        //    @"INSERT INTO Customers (Name, Phone, Email) 
        //          VALUES ({0}, {1}, {2})",
        //    customer.Name,
        //    customer.Phone,
        //    customer.Email);
    }


    public async Task UpdateAsync(Customer customer)
    {
        _db.Customers.Update(customer);
        await _db.SaveChangesAsync();
        //await _db.Database.ExecuteSqlRawAsync(
        //       @"UPDATE Customers 
        //          SET Name = {0}, Phone = {1}, Email = {2} 
        //          WHERE Id = {3}",
        //       customer.Name,
        //       customer.Phone,
        //       customer.Email,
        //       customer.Id);
    }

    public async Task DeleteAsync(int id)
    {
        var customer = await _db.Customers.FindAsync(id);
        if (customer != null)
        {
            _db.Customers.Remove(customer);
            await _db.SaveChangesAsync();
            //await _db.Database.ExecuteSqlRawAsync(
            //    "DELETE FROM Customers WHERE Id = {0}", id);
        }
    }
}