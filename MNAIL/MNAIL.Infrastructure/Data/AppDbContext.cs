using Microsoft.EntityFrameworkCore;
using MNAIL.Domain.Entities;

namespace MNAIL.Infrastructure.Data;

//cd D:\Projects\MNAIL\MNAIL.Infrastructure
//dotnet ef migrations add Addservice --startup-project ../MNAIL.Api
//dotnet ef database update --startup - project.. / MNAIL.Api
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<NailService> NailServices => Set<NailService>();
    public DbSet<Staff> Staffs => Set<Staff>();

    public DbSet<ServiceItem> ServiceItems => Set<ServiceItem>();
    public DbSet<Member> Members => Set<Member>(); // 加上这行


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // 配置 NailService.Price 的精度
        modelBuilder.Entity<NailService>()
            .Property(s => s.Price)
            .HasPrecision(10, 2); // 10位数字，2位小数，适合价格场景
        modelBuilder.Entity<ServiceItem>()
        .Property(s => s.Price)
        .HasPrecision(18, 2); // 18位数字，2位小数，完全满足价格需求
                              // 会员余额精度
        modelBuilder.Entity<Member>()
            .Property(m => m.Balance)
            .HasPrecision(18, 2);
    }
}