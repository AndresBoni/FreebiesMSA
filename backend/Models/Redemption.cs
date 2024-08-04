using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
   [Table("Redemptions")]
    public class Redemption
    {
        [Key]
        public int RedemptionId { get; set; }

        [Required]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        [Required]
        public int CouponId { get; set; }
        public Coupon Coupon { get; set; }
        public int CampaignId { get; set; }
        public string RedemptionCode { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ExpirationDate { get; set; }
        public DateTime? RedeemedAt { get; set; }
        public bool Validated { get; set; }
    }
}
