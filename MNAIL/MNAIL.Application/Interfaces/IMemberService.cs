using System;
using System.Collections.Generic;
using System.Text;
using MNAIL.Domain.Entities;

namespace MNAIL.Application.Interfaces
{
    public interface IMemberService
    {
        Task<List<Member>> GetAllAsync();
        Task<Member?> GetByIdAsync(int id);
        Task<Member?> GetByPhoneAsync(string phone);
        Task<string> CreateAsync(Member member); // 返回结果消息
        Task<string> UpdateAsync(Member member);
        Task<string> DeleteAsync(int id);
    }
}
