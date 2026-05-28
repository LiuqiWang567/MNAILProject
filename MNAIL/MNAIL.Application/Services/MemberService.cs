using MNAIL.Application.Interfaces;
using MNAIL.Domain.Entities;
using MNAIL.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MNAIL.Application.Services
{
    public class MemberService : IMemberService
    {
        private readonly IMemberRepository _repo;

        public MemberService(IMemberRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<Member>> GetAllAsync()
        {
            return await _repo.GetAllAsync();
        }

        public async Task<Member?> GetByIdAsync(int id)
        {
            return await _repo.GetByIdAsync(id);
        }

        public async Task<Member?> GetByPhoneAsync(string phone)
        {
            return await _repo.GetByPhoneAsync(phone);
        }

        public async Task<string> CreateAsync(Member member)
        {
            // 业务校验：手机号不能重复
            if (await _repo.ExistsByPhoneAsync(member.Phone))
                return "手机号已存在，无法新增";

            member.CreateTime = DateTime.Now;
            member.IsEnabled = true;
            await _repo.AddAsync(member);
            return "新增成功";
        }

        public async Task<string> UpdateAsync(Member member)
        {
            var exist = await _repo.GetByIdAsync(member.Id);
            if (exist == null) return "会员不存在";

            // 手机号重复校验（排除自己）
            var samePhone = await _repo.GetByPhoneAsync(member.Phone);
            if (samePhone != null && samePhone.Id != member.Id)
                return "手机号已被其他会员使用";

            // 只更新允许字段
            exist.Name = member.Name;
            exist.Phone = member.Phone;
            exist.Wechat = member.Wechat;
            exist.Gender = member.Gender;
            exist.Birthday = member.Birthday;
            exist.Balance = member.Balance;
            exist.Points = member.Points;
            exist.Level = member.Level;
            exist.Remark = member.Remark;
            exist.IsEnabled = member.IsEnabled;

            await _repo.UpdateAsync(exist);
            return "更新成功";
        }

        public async Task<string> DeleteAsync(int id)
        {
            var member = await _repo.GetByIdAsync(id);
            if (member == null) return "会员不存在";

            await _repo.DeleteAsync(member);
            return "删除成功";
        }
    }
}