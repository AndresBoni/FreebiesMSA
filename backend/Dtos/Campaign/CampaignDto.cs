using backend.Dtos.Coupon;

namespace backend.Dtos.Campaign
{
    public class CampaignDto
    {
        public int CampaignId { get; set; }
        public string UserId { get; set; }
        public string State { get; set; } = string.Empty;
        public string District { get; set; } = string.Empty;
        public string[] AvailableDays { get; set; } = Array.Empty<string>();
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public bool IsAllDay { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string TargetCustomer { get; set; } = string.Empty;
        public int TotalCoupons { get; set; }
        public int RedeemedCoupons { get; set; }
        public int InProgressCoupons { get; set; }
        public CouponDto Coupon { get; set; }
    }

}