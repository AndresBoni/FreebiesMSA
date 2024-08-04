using System.Security.Claims;
using backend.Models;

namespace backend.Interfaces
{
   public interface IUserService
    {
        Task<ApplicationUser?> GetAuthenticatedUserAsync(ClaimsPrincipal userPrincipal);
        Task<bool> IsUserInRoleAsync(ApplicationUser user, string role);
    }
}