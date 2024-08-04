namespace backend.Services
{
    public static class CouponCodeService
    {
        private static readonly Random random = new Random();
        private const string chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";

        public static string GenerateCouponCode(int length = 6)
        {
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}