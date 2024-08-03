namespace backend.Dtos.Redemption
{
    public class RedemptionDTO
    {
        public int RedemptionId { get; set; }
        public string UserId { get; set; }
        public string RedemptionCode { get; set; }
        public DateTime RedeemedAt { get; set; }
        public bool Validated { get; set; }
    }
}