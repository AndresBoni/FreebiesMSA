using backend.Models;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IRedemptionRepository
    {
        Task<Redemption> CreateRedemptionAsync(Redemption redemption);
        Task<Redemption?> GetRedemptionByCodeAsync(string redemptionCode);
        Task<bool> UpdateRedemptionAsync(Redemption redemption);
        Task CleanUpExpiredRedemptionsAsync();
    }
}
