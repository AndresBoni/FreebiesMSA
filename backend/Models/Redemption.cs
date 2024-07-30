using System;

namespace backend.Models
{
    public class Redemption
    {
        public int RedemptionId { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public int CouponId { get; set; }
        public Coupon Coupon { get; set; }
        public string RedemptionCode { get; set; }
        public DateTime RedeemedAt { get; set; }
        public bool Validated { get; set; }
    }
}
