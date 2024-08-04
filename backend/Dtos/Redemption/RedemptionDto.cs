namespace backend.Dtos.Redemption
{
    public class RedemptionDTO
    {
        public int RedemptionId { get; set; }
        public string UserId { get; set; }
        public int CampaignId { get; set; }
        public int CouponId { get; set; }
        public string RedemptionCode { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool Validated { get; set; }
    }
}