namespace backend.Dtos.Coupon
{
    public class CouponDto
    {
        public int CouponId { get; set; }
        public string Title { get; set; }
        public string Store { get; set; }
        public string Image { get; set; }
        public string ShortDescription { get; set; }
        public string Conditions { get; set; }
    }
}