using backend.Dtos.Redemption;

namespace backend.Mapping
{
    public static class RedemptionMapper
    {
        public static RedemptionDTO ToDto(Models.Redemption redemption)
        {
            return new RedemptionDTO
            {
                RedemptionId = redemption.RedemptionId,
                UserId = redemption.UserId,
                CampaignId = redemption.CampaignId,
                CouponId = redemption.CouponId,
                RedemptionCode = redemption.RedemptionCode,
                CreatedAt = redemption.CreatedAt,
                ExpirationDate = redemption.ExpirationDate,
                Validated = redemption.Validated
            };
        }

        public static Models.Redemption ToModel(RedemptionDTO redemptionDto)
        {
            return new Models.Redemption
            {
                RedemptionId = redemptionDto.RedemptionId,
                UserId = redemptionDto.UserId,
                CampaignId = redemptionDto.CampaignId,
                CouponId = redemptionDto.CouponId,
                RedemptionCode = redemptionDto.RedemptionCode,
                CreatedAt = redemptionDto.CreatedAt,
                ExpirationDate = redemptionDto.ExpirationDate,
                Validated = redemptionDto.Validated
            };
        }
    }
}