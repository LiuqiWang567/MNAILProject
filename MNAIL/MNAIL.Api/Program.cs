using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using MNAIL.Api.Middlewares;
using MNAIL.Application.Interfaces;
using MNAIL.Application.Services;
using MNAIL.Domain.Interfaces;
using MNAIL.Infrastructure.Data;
using MNAIL.Infrastructure.Repositories;
using System.Data;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
// 1. 添加跨域服务
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        // 允许所有本地开发地址，避免端口变化导致请求失败
        policy.WithOrigins(
                "http://localhost:43884",
                "http://127.0.0.1:43884",
                "http://localhost:8080",
                "http://127.0.0.1:8080"
            )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // 允许携带 Cookie/Token（微信小程序需要）
    });
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
// 2. Swagger + JWT 授权
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "MNAIL.Api", Version = "v1" });

    // 定义 Bearer 认证方案
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "请输入: Bearer {token}"
    });

    // 2. 全局安全要求（v10+ 必须用这个写法）
    c.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        [new OpenApiSecuritySchemeReference("Bearer", document)] = new List<string>()
    });
});

// 数据库
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("Default"),
        b => b.MigrationsAssembly("MNAIL.Infrastructure") // 关键：指定迁移文件生成到 Infrastructure 项目
    ));
// 2. 注册 Dapper IDbConnection（和 EF 共用同一个连接串）
builder.Services.AddScoped<IDbConnection>(sp =>
    new Microsoft.Data.SqlClient.SqlConnection(
        builder.Configuration.GetConnectionString("Default")
    ));
// 注入服务
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<INailServiceRepository, NailServiceRepository>();
builder.Services.AddScoped<INailServiceService, NailServiceService>();
builder.Services.AddScoped<IStaffRepository, StaffRepository>();
builder.Services.AddScoped<IStaffService, StaffService>();
builder.Services.AddScoped<IServiceItemRepository, ServiceItemRepository>();
builder.Services.AddScoped<IServiceItemService, ServiceItemService>();
builder.Services.AddScoped<IMemberRepository, MemberRepository>();
builder.Services.AddScoped<IMemberService, MemberService>();

// ============================
// 3. JWT 认证
var jwtSecret = builder.Configuration["Jwt:SecretKey"]
    ?? throw new InvalidOperationException("Jwt:Secret 未配置");
var key = Encoding.UTF8.GetBytes(jwtSecret);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ClockSkew = TimeSpan.Zero
        };

        // 认证失败返回 JSON，不返回 HTML
        options.Events = new JwtBearerEvents
        {
            OnChallenge = async context =>
            {
                context.HandleResponse();
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsJsonAsync(new
                {
                    code = 401,
                    message = "未授权，请先登录"
                });
            }
        };
    });

// 开启授权
builder.Services.AddAuthorization();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<GlobalExceptionMiddleware>();
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication(); // 必须在 Authorization 前面
app.UseAuthorization();
app.MapControllers();
app.Run();