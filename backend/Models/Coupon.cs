using System.Collections.Generic;

namespace backend.Models
{
    public class Coupon
    {
        public int CouponId { get; set; }
        public string Title { get; set; }
        public string Store { get; set; }
        public string Image { get; set; }
        public string ShortDescription { get; set; }
        public string Conditions { get; set; }
        public Campaign Campaign { get; set; }
        public int CampaignId { get; set; }
        public ICollection<Redemption> Redemptions { get; set; }
    }
}
