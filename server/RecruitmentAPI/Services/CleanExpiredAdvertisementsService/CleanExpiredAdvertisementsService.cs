using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;
using RecruitmentAPI.Services.JobAdvertisementService;

namespace RecruitmentAPI.Services.CleanExpiredAdvertisementsService;

public class CleanExpiredAdvertisementsService : IHostedService
{
    private readonly IJobAdvertisementService _jobAdvertisementService;
    private Timer _timer;

    public CleanExpiredAdvertisementsService(IJobAdvertisementService jobAdvertisementService)
    {
        _jobAdvertisementService = jobAdvertisementService;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromDays(1)); 
        return Task.CompletedTask;
    }

    private async void DoWork(object state)
    {
        await _jobAdvertisementService.DeleteExpiredAdvertisements();
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }
}