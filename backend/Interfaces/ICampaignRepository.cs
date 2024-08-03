using backend.Dtos.Campaign;
using backend.Models;

public interface ICampaignRepository
{
    Task<List<CampaignDto>> GetAllAsync();
    Task<CampaignDto?> GetByIdAsync(int id);
    Task<Campaign> CreateAsync(Campaign campaign);
    Task<CampaignDto?> UpdateAsync(int id, UpdateCampaignDto campaign, ApplicationUser user);
    Task<bool> DeleteAsync(int id);
}