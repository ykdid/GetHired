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
    
    public async Task<JobAdvertisement> GetAdvertisementByJobAdvertisementId(int id)
    {
        try
        {
            var advertisement = await _context.JobAdvertisements.FindAsync(id);

            if (advertisement == null)
            {
                throw new KeyNotFoundException($"JobAdvertisement with id {id} was not found.");
            }

            return advertisement;
        }
        catch (Exception e)
        {
            throw new Exception("Failed.", e);
        }
    }
    
    

    public async Task<List<JobAdvertisement>> GetAdvertisementsByEmployerId(int employerId)
    {
        try
        {
            return await _context.JobAdvertisements
                .Where(ja => ja.EmployerId == employerId)
                .OrderBy(ja=> ja.InitDate)
                .ToListAsync();
        }
        catch (Exception e)
        {
            throw new Exception("Failed.", e);
        }
    }

    public async Task<List<JobAdvertisement>> GetAllAdvertisements(int userId)
    {
        var appliedAdvertisementIds = await _context.JobApplications
            .Where(ja => ja.UserId == userId)
            .Select(ja => ja.JobAdvertisementId)
            .ToListAsync();

        
        var advertisements = await _context.JobAdvertisements
            .Where(ad => !appliedAdvertisementIds.Contains(ad.Id))
            .OrderByDescending(ad => ad.InitDate)
            .ToListAsync();

        return advertisements;

    }

    public async Task<bool> DeleteAdvertisement(int advertisementId)
    {
        var applications = await _context.JobApplications
            .Where(ja => ja.JobAdvertisementId == advertisementId)
            .ToListAsync();

        if (applications.Any())
        {
            _context.JobApplications.RemoveRange(applications);
            await _context.SaveChangesAsync();
        }
        
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

        if (updatedAdv.EmploymentType != null)
        {
            adv.EmploymentType = updatedAdv.EmploymentType;
        }

        await _context.SaveChangesAsync();

        return adv;

    }
    
    
}