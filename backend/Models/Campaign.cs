using System;
using System.Collections.Generic;

namespace backend.Models
{
    public class Campaign
    {
        public int CampaignId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public ApplicationUser User { get; set; }
        public int CouponId { get; set; }
        public Coupon Coupon { get; set; }
        public string AvailableDays { get; set; }
        public string AvailableHours { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public TargetCustomer TargetCustomer { get; set; }
        public int TotalCoupons { get; set; }
        public int RedeemedCoupons { get; set; }
        public int InProgressCoupons { get; set; }
    }

    public enum TargetCustomer
    {
        New,
        Returning,
        All
    }
}
