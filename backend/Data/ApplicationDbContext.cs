using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Redemption> Redemptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.Campaigns)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId);

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(u => u.Redemptions)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId);

            modelBuilder.Entity<Campaign>()
                .HasOne(c => c.Coupon)
                .WithOne(co => co.Campaign)
                .HasForeignKey<Campaign>(c => c.CouponId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Coupon>()
                .HasMany(c => c.Redemptions)
                .WithOne(r => r.Coupon)
                .HasForeignKey(r => r.CouponId);

            modelBuilder.Entity<Redemption>()
                .HasOne(r => r.User)
                .WithMany(u => u.Redemptions)
                .HasForeignKey(r => r.UserId);

            modelBuilder.Entity<Redemption>()
                .HasOne(r => r.Coupon)
                .WithMany(c => c.Redemptions)
                .HasForeignKey(r => r.CouponId);
        }
    }
}
