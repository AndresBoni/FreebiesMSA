using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("Coupons")]
    public class Coupon
    {
        [Key]
        public int CouponId { get; set; }
        [Required]
        public string Title { get; set; }
        public string Store { get; set; }  // ApplicationUser->Name
        public string Image { get; set; }
        public string ShortDescription { get; set; }
        public string Conditions { get; set; }

        [Required]
        public int CampaignId { get; set; }
        public Campaign Campaign { get; set; }

        public ICollection<Redemption> Redemptions { get; set; } = new List<Redemption>();
    }
}
