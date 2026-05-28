namespace MNAIL.Core.Helpers;

public static class PasswordHelper
{
    public static string Hash(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password, 12);
    }

    public static bool Verify(string raw, string hashed)
    {
        return BCrypt.Net.BCrypt.Verify(raw, hashed);
    }
}