using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.JobAdvertisementService;

public class JobAdvertisementService:IJobAdvertisementService
{
    private readonly RecruitmentDbContext _context;

    public JobAdvertisementService(RecruitmentDbContext context)
    {
        _context = context;
    }

    public async Task<bool> CreateAdvertisement(JobAdvertisement jobAdvertisement)
    {
        _context.JobAdvertisements.Add(jobAdvertisement);

        var result = await _context.SaveChangesAsync();

        return result > 0;
    }

    public async Task<List<JobAdvertisement>> GetAdvertisementsByEmployerId(int employerId)
    {
        try
        {
            return await _context.JobAdvertisements
                .Where(ja => ja.EmployerId == employerId)
                .ToListAsync();
        }
        catch (Exception e)
        {
            throw new Exception("Failed.", e);
        }
    }

    public async Task<List<JobAdvertisement>> GetAllAdvertisements()
    {
        return await _context.JobAdvertisements.ToListAsync();
    }

    public async Task<bool> DeleteAdvertisement(int advertisementId)
    {
        var advertisement = await _context.JobAdvertisements.FindAsync(advertisementId);
        
        if (advertisement == null)
        {
            return false;
        }

        _context.JobAdvertisements.Remove(advertisement);
        var result = await _context.SaveChangesAsync();

        return result > 0;
    }

    public async Task<JobAdvertisement> UpdateAdvertisement(int  id,JobAdvertisement updatedAdv)
    {
        var adv = await _context.JobAdvertisements.FindAsync(id);

        if (adv == null)
        {
            throw new KeyNotFoundException($"{updatedAdv} was not found.");
        }

        adv.Description = updatedAdv.Description ?? adv.Description;
        adv.Title = updatedAdv.Title ?? adv.Title;
        adv.HtmlContent = updatedAdv.HtmlContent ?? adv.HtmlContent;
        adv.ImagePath = updatedAdv.ImagePath ?? adv.ImagePath;
        adv.JobType = updatedAdv.ImagePath ?? adv.JobType;

        await _context.SaveChangesAsync();

        return adv;

    }
    
    
}