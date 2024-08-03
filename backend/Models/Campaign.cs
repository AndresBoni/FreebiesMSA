using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("Campaigns")]
    public class Campaign
    {
        [Key]
        public int CampaignId { get; set; }

        [Required]
        public string UserId { get; set; } = string.Empty;
        [JsonIgnore]
        public ApplicationUser? User { get; set; }

        [Required]
        public int CouponId { get; set; }
        public Coupon? Coupon { get; set; }

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
    }
}
