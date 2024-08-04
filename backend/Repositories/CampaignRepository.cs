using backend.Dtos.Campaign;
using backend.Mapping;
using backend.Models;
using Microsoft.EntityFrameworkCore;

public class CampaignRepository : ICampaignRepository
{
    private readonly ApplicationDbContext _context;

    public CampaignRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<CampaignDto>> GetAllAsync()
    {
        return await _context.Campaigns
        .Include(c => c.Coupon)
        .Select(c => c.ToCampaignDto()).ToListAsync();
    }
    public async Task<CampaignDto?> GetByIdAsync(int id)
    {
        return await _context.Campaigns
         .Include(c => c.Coupon)
         .Where(c => c.CampaignId == id)
         .Select(c => c.ToCampaignDto()).FirstOrDefaultAsync();
    }

    public async Task<Campaign> CreateAsync(Campaign campaign)
    {
        await _context.Campaigns.AddAsync(campaign);
        await _context.SaveChangesAsync();

        if (campaign.Coupon != null)
        {
            campaign.Coupon.CampaignId = campaign.CampaignId;
            _context.Entry(campaign.Coupon).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        return campaign;
    }

    public async Task<CampaignDto?> UpdateAsync(int id, UpdateCampaignDto campaignDto, ApplicationUser user)
    {
        var existingCampaign = await _context.Campaigns.Include(c => c.Coupon).FirstOrDefaultAsync(c => c.CampaignId == id);
        if (existingCampaign == null)
            return null;

        // Update properties
        existingCampaign.State = campaignDto.State;
        existingCampaign.District = campaignDto.District;
        existingCampaign.AvailableDays = campaignDto.AvailableDays;
        existingCampaign.StartTime = ParseTime(campaignDto.StartTime);
        existingCampaign.EndTime = ParseTime(campaignDto.EndTime);
        existingCampaign.IsAllDay = campaignDto.IsAllDay;
        existingCampaign.StartDate = campaignDto.StartDate;
        existingCampaign.EndDate = campaignDto.EndDate;
        existingCampaign.TargetCustomer = campaignDto.TargetCustomer;
        existingCampaign.TotalCoupons = campaignDto.TotalCoupons;
        
        // Update coupon if necessary
        if (existingCampaign.Coupon != null && campaignDto.Coupon != null)
        {
            existingCampaign.Coupon.Title = campaignDto.Coupon.Title;
            existingCampaign.Coupon.Image = campaignDto.Coupon.Image;
            existingCampaign.Coupon.ShortDescription = campaignDto.Coupon.ShortDescription;
            existingCampaign.Coupon.Conditions = campaignDto.Coupon.Conditions;
            existingCampaign.Coupon.Store = user.Name;
        }

        _context.Campaigns.Update(existingCampaign);
        await _context.SaveChangesAsync();

        
        return existingCampaign.ToCampaignDto();
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var campaign = await _context.Campaigns
                .Include(c => c.Coupon) 
                .FirstOrDefaultAsync(i => i.CampaignId == id);

            if (campaign == null)
            {
                await transaction.RollbackAsync();
                return false;
            }
            
            if (campaign.Coupon != null) 
                _context.Coupons.Remove(campaign.Coupon);
            

            _context.Campaigns.Remove(campaign);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return true;
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return false;
        }
    }

    private static TimeSpan? ParseTime(string? time)
{
    return TimeSpan.TryParse(time, out var parsedTime) ? parsedTime : (TimeSpan?)null;
}
}
