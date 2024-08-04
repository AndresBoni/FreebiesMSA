using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Coupons")]
    public class Coupon
    {
        [Key]
        public int CouponId { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        public string Store { get; set; }  // ApplicationUser->Name
        public string Image { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string Conditions { get; set; } = string.Empty;

        [Required]
        public int CampaignId { get; set; }
        public Campaign Campaign { get; set; }

        public ICollection<Redemption> Redemptions { get; set; } = new List<Redemption>();
    }
}
