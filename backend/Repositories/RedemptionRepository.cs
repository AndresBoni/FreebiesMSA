using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class RedemptionRepository : IRedemptionRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<RedemptionRepository> _logger;

        public RedemptionRepository(ApplicationDbContext context, ILogger<RedemptionRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Redemption?> CreateRedemptionAsync(Redemption redemption)
        {
            try
            {
                var campaign = await _context.Campaigns.FindAsync(redemption.CampaignId);

                if (campaign == null)
                {
                    _logger.LogWarning("Campaign not found: {CampaignId}", redemption.CampaignId);
                    return null;
                }

                if(campaign.TotalCoupons < 1)
                    return null;

                campaign.TotalCoupons -= 1;
                campaign.InProgressCoupons += 1;

                redemption.CouponId = campaign.CouponId;

                _context.Redemptions.Add(redemption);

                await _context.SaveChangesAsync();

                return redemption;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating redemption.");
                throw new Exception("Error creating redemption", ex);
            }
        }

        public async Task<Redemption?> GetRedemptionByCodeAsync(string redemptionCode)
        {
            var code = redemptionCode.ToString();
            try
            {
                return await _context.Redemptions
                    .FirstOrDefaultAsync(r => r.RedemptionCode == code);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting redemption by code.");
                throw new Exception("Error getting redemption by code", ex);
            }
        }

        public async Task<bool> UpdateRedemptionAsync(Redemption redemption)
        {
            var campaign = await _context.Campaigns.FindAsync(redemption.CampaignId);
            if (campaign == null)
            {
                _logger.LogWarning("Campaign not found for Redemption.");
                return false;
            }

            campaign.InProgressCoupons -= 1;
            campaign.RedeemedCoupons += 1;

            redemption.Validated = true;
            redemption.RedeemedAt = DateTime.UtcNow;

            try
            {
                _context.Campaigns.Update(campaign);
                _context.Redemptions.Update(redemption);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating redemption.");
                return false;
                throw new Exception("Error updating redemption", ex);
            }
        }

        public async Task<bool> DeleteRedemptionAsync(int redemptionId)
        {
            try
            {
                var now = DateTime.UtcNow;
                var redemption = await _context.Redemptions
                    .FirstOrDefaultAsync(r => r.RedemptionId == redemptionId);

                if (redemption == null)
                {
                    _logger.LogWarning("Redemption not found: {RedemptionId}", redemptionId);
                    return false;
                }

                if (redemption.ExpirationDate < now && !redemption.Validated)
                {
                    var campaign = await _context.Campaigns.FindAsync(redemption.CampaignId);
                    if (campaign != null)
                    {
                        campaign.TotalCoupons += 1;
                        campaign.InProgressCoupons -= 1;
                    }

                    _context.Redemptions.Remove(redemption);

                    await _context.SaveChangesAsync();

                    return true; 
                }
                
                return false; 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while deleting redemption.");
                throw new Exception("Error deleting redemption", ex);
            }
        }

        public async Task CleanUpExpiredRedemptionsAsync()
        {
            try
            {
                var now = DateTime.UtcNow;
                var expiredRedemptions = await _context.Redemptions
                    .Where(r => r.ExpirationDate < now && !r.Validated)
                    .ToListAsync();

                if (expiredRedemptions.Any())
                {
                    var campaignUpdates = expiredRedemptions
                        .GroupBy(r => r.CampaignId)
                        .Select(group => new
                        {
                            CampaignId = group.Key,
                            Count = group.Count()
                        })
                        .ToList();

                    foreach (var update in campaignUpdates)
                    {
                        var campaign = await _context.Campaigns.FindAsync(update.CampaignId);
                        if (campaign != null)
                        {
                            campaign.TotalCoupons += update.Count;
                            campaign.InProgressCoupons -= update.Count;
                        }
                    }
                    _context.Redemptions.RemoveRange(expiredRedemptions);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while cleaning up expired redemptions.");
                throw new Exception("Error cleaning up expired redemptions", ex);
            }
        }
    }
}
