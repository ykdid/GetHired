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

    public async Task UpdateJobApplicationStatus(int jobApplicationId, JobApplicationStatus status)
    {
        var jobApplication = await _context.JobApplications
            .Include(ja => ja.User)
            .Include(ja => ja.Employer)
            .FirstOrDefaultAsync(ja => ja.Id == jobApplicationId);

        if (jobApplication == null)
        {
            throw new Exception("Job application not found.");
        }

        jobApplication.Status = status;
        
        if (status == JobApplicationStatus.Accepted)
        {
            var employee = new Employee
            {
                Name = jobApplication.User.Name,
                Surname = jobApplication.User.Surname,
                Email = jobApplication.User.Email,
                JobType = jobApplication.User.JobType,
                EmployerId = jobApplication.EmployerId,
                RegistrationNumber = jobApplication.User.RegistrationNumber,
                IdentityNumber = jobApplication.User.IdentityNumber
            };

            _context.Employees.Add(employee);
        }

        await _context.SaveChangesAsync();
    }
}