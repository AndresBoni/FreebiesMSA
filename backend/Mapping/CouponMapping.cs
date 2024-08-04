using backend.Dtos.Coupon;
using backend.Models;

namespace backend.Mapping
{
    public static class CouponMapping
    {
        public static CouponDto ToCouponDto(this Coupon coupon)
        {
            return new CouponDto
            {
                CouponId = coupon.CouponId,
                Title = coupon.Title,
                Store = coupon.Store,
                Image = coupon.Image,
                ShortDescription = coupon.ShortDescription,
                Conditions = coupon.Conditions
            };
        }

        public static Coupon ToCoupon(this CreateCouponDto dto, string store)
        {
            return new Coupon
            {
                Title = dto.Title,
                Store = store,
                Image = dto.Image,
                ShortDescription = dto.ShortDescription,
                Conditions = dto.Conditions
            };
        }

        public static Coupon ToCoupon(this UpdateCouponDto dto, string store)
        {
            return new Coupon
            {
                Title = dto.Title,
                Store = store,
                Image = dto.Image,
                ShortDescription = dto.ShortDescription,
                Conditions = dto.Conditions
            };
        }
    }
}