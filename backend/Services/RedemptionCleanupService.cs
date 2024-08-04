using backend.Interfaces;

namespace backend.Services
{
    public class RedemptionCleanupService : BackgroundService
    {
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private Timer _timer;

        public RedemptionCleanupService(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _timer = new Timer(async _ =>
            {
                await CleanupExpiredRedemptionsAsync(stoppingToken);
            }, null, TimeSpan.Zero, TimeSpan.FromMinutes(15));

            return Task.CompletedTask;
        }

        private async Task CleanupExpiredRedemptionsAsync(CancellationToken cancellationToken)
        {
            using (var scope = _serviceScopeFactory.CreateScope())
            {
                var redemptionRepository = scope.ServiceProvider.GetRequiredService<IRedemptionRepository>();
                await redemptionRepository.CleanUpExpiredRedemptionsAsync();
            }
        }

        public override Task StopAsync(CancellationToken stoppingToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return base.StopAsync(stoppingToken);
        }

        public override void Dispose()
        {
            _timer?.Dispose();
            base.Dispose();
        }
    }
}
