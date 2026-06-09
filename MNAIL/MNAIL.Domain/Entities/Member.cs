namespace MNAIL.Domain.Entities;

public class Member
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Wechat { get; set; }
    public string? Gender { get; set; } // 男/女/其他
    public DateTime? Birthday { get; set; }
    public decimal Balance { get; set; } // 余额
    public int Points { get; set; } // 积分
    public string? Level { get; set; } // 会员等级：普通/银卡/金卡/钻石
    public string? Remark { get; set; }
    public bool IsEnabled { get; set; } = true;

    public string? Avatar { get; set; }//头像
    public DateTime CreateTime { get; set; } = DateTime.Now;
}