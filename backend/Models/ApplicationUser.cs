using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public string? Image { get; set; }
        public ICollection<Campaign> Campaigns { get; set; }
        public ICollection<Redemption> Redemptions { get; set; }
    }
}
