using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Coupon
{
    public class UpdateCouponDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public string ShortDescription { get; set; }
        [Required]
        public string Conditions { get; set; }
    }
}