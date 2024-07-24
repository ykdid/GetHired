using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.JobApplicationService;

public class JobApplicationService : IJobApplicationService
{
    private readonly RecruitmentDbContext _context;

    public JobApplicationService(RecruitmentDbContext context)
    {
        _context = context;
    }

    public async Task<bool> CreateJobApply(JobApplication jobApplication)
    {
         _context.JobApplications.Add(jobApplication);

         var result = await _context.SaveChangesAsync();

         return result > 0;
    }

    public async Task<List<JobApplication>> GetJobApplicationsByUserId(int id)
    {

        return await _context.JobApplications
            .Where(ja => ja.UserId == id)
            .ToListAsync();
        
    }

    public async Task<List<JobApplication>> GetJobApplicationsByAdvertisementId(int id)
    {
        return await _context.JobApplications
            .Where(ja => ja.JobAdvertisementId == id)
            .ToListAsync();
    }

    public async Task<bool> DeleteJobApplication(int jobApplicationId)
    {
        var jobApplication = await _context.JobApplications.FindAsync(jobApplicationId);

        if (jobApplication == null)
        {
            throw new KeyNotFoundException($"JobApplication with  id {jobApplicationId} was not found.");
        }

        _context.JobApplications.Remove(jobApplication);
        var result = await _context.SaveChangesAsync();

        return result > 0;

    }

    public async Task UpdateJobApplicationStatus(int jobApplicationId, JobApplicationStatus status)
    {
        var jobApplication = await _context.JobApplications
            .FirstOrDefaultAsync(ja => ja.Id == jobApplicationId);

        if (jobApplication == null)
        {
            throw new KeyNotFoundException($"Job application with id {jobApplicationId} was not found.");
        }

        jobApplication.Status = status;

        if (status == JobApplicationStatus.Accepted)
        {
            var user = await _context.Users.FindAsync(jobApplication.UserId);
            var employerId = jobApplication.EmployerId;

            if (user == null)
            {
                throw new KeyNotFoundException($"User with id {jobApplication.UserId} was not found.");
            }

            var employee = new Employee
            {
                Name = user.Name,
                Surname = user.Surname,
                IdentityNumber = user.IdentityNumber,
                RegistrationNumber = user.RegistrationNumber,
                EmployerId = employerId,
                Email = user.EncryptedEmail
            };

            _context.Employees.Add(employee);
        }
        await _context.SaveChangesAsync();
    }
}

