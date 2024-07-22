using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.JobApplicationService;

public interface IJobApplicationService
{
    Task UpdateJobApplicationStatus(int jobApplicationId, JobApplicationStatus status);
}