using System.ComponentModel.DataAnnotations;
using System.Globalization;
using backend.Dtos.Coupon;

namespace backend.Dtos.Campaign
{
    public class UpdateCampaignDto : IValidatableObject
    {
        [Required]
        [StringLength(100, ErrorMessage = "State cannot be longer than 100 characters.")]
        public string State { get; set; } = string.Empty;

        [Required]
        [StringLength(100, ErrorMessage = "District cannot be longer than 100 characters.")]
        public string District { get; set; } = string.Empty;

        [Required]
        public string[] AvailableDays { get; set; } = Array.Empty<string>();

        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
        [Required]
        public bool IsAllDay { get; set; } = false;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "TargetCustomer cannot be longer than 100 characters.")]
        public string TargetCustomer { get; set; } = string.Empty;

        [Required]
        [Range(1, 5000, ErrorMessage = "TotalCoupons must be between 1 and 5000.")]
        public int TotalCoupons { get; set; }

        [Required]
        public CreateCouponDto Coupon { get; set; } = new CreateCouponDto();

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validDays = new HashSet<string> { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };

            // Validate days
            foreach (var day in AvailableDays)
            {
                if (!validDays.Contains(day))
                {
                    yield return new ValidationResult($"Invalid day: {day}", new[] { nameof(AvailableDays) });
                }
            }

            // Validate hours format
            if (!IsAllDay)
            {
                if (string.IsNullOrWhiteSpace(StartTime) || string.IsNullOrWhiteSpace(EndTime))
                {
                    yield return new ValidationResult("StartTime and EndTime must be provided if IsAllDay is false.", new[] { nameof(StartTime), nameof(EndTime) });
                }

                if (!IsValidTimeFormat(StartTime))
                {
                    yield return new ValidationResult("Invalid StartTime format. Use 'HH:mm'.", new[] { nameof(StartTime) });
                }

                if (!IsValidTimeFormat(EndTime))
                {
                    yield return new ValidationResult("Invalid EndTime format. Use 'HH:mm'.", new[] { nameof(EndTime) });
                }
                 else
                {
                    // Check if EndTime is after StartTime
                    if (TimeSpan.Parse(EndTime) <= TimeSpan.Parse(StartTime))
                    {
                        yield return new ValidationResult("EndTime must be after StartTime.", new[] { nameof(EndTime) });
                    }
                }
            }
            else
            {
                if (!string.IsNullOrWhiteSpace(StartTime) || !string.IsNullOrWhiteSpace(EndTime))
                {
                    yield return new ValidationResult("StartTime and EndTime should not be provided if IsAllDay is true.", new[] { nameof(StartTime), nameof(EndTime) });
                }
            }
        }
        private bool IsValidTimeFormat(string? time)
        {
            if (string.IsNullOrWhiteSpace(time))
                return true;

            return TimeSpan.TryParseExact(time, "hh\\:mm", CultureInfo.InvariantCulture, out _);
        }
    }
}
