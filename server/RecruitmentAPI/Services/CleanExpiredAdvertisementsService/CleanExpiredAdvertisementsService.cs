using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;
using RecruitmentAPI.Services.JobAdvertisementService;

namespace RecruitmentAPI.Services.CleanExpiredAdvertisementsService
{
    public class CleanExpiredAdvertisementsService : IHostedService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private Timer _timer;

        public CleanExpiredAdvertisementsService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromDays(1));
            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var jobAdvertisementService = scope.ServiceProvider.GetRequiredService<IJobAdvertisementService>();
                jobAdvertisementService.DeleteExpiredAdvertisements().Wait(); 
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }
    }
}