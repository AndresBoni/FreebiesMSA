using backend.Dtos.Campaign;
using backend.Models;

namespace backend.Mapping
{
    public static class CampaignMapping
    {
        public static CampaignDto ToCampaignDto(this Campaign campaign)
        {
            return new CampaignDto
            {
                CampaignId = campaign.CampaignId,
                UserId = campaign.UserId,
                State = campaign.State,
                District = campaign.District,
                AvailableDays = campaign.AvailableDays,
                StartTime = campaign.StartTime,
                EndTime = campaign.EndTime,
                IsAllDay = campaign.IsAllDay,
                StartDate = campaign.StartDate,
                EndDate = campaign.EndDate,
                TargetCustomer = campaign.TargetCustomer,
                TotalCoupons = campaign.TotalCoupons,
                RedeemedCoupons = campaign.RedeemedCoupons,
                InProgressCoupons = campaign.InProgressCoupons,
                Coupon = campaign.Coupon?.ToCouponDto()
            };
        }

        public static Campaign ToCampaign(this CreateCampaignDto dto, string userId, string store)
        {
            return new Campaign
            {
                UserId = userId,
                State = dto.State,
                District = dto.District,
                AvailableDays = dto.AvailableDays,
                StartTime = ParseTime(dto.StartTime),
                EndTime = ParseTime(dto.EndTime),
                IsAllDay = dto.IsAllDay,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                TargetCustomer = dto.TargetCustomer,
                TotalCoupons = dto.TotalCoupons,
                Coupon = dto.Coupon?.ToCoupon(store)
            };
        }
        
        public static Campaign ToCampaign(this UpdateCampaignDto dto, string userId, string store)
        {
            return new Campaign
            {
                UserId = userId,
                State = dto.State,
                District = dto.District,
                AvailableDays = dto.AvailableDays,
                StartTime = ParseTime(dto.StartTime),
                EndTime = ParseTime(dto.EndTime),
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                TargetCustomer = dto.TargetCustomer,
                TotalCoupons = dto.TotalCoupons,
                Coupon = dto.Coupon?.ToCoupon(store)
            };
        }

         private static TimeSpan? ParseTime(string? time)
        {
            return TimeSpan.TryParse(time, out var parsedTime) ? parsedTime : (TimeSpan?)null;
        }
    }

    

}