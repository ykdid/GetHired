using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.JobApplicationService;

public interface IJobApplicationService
{
    Task UpdateJobApplicationStatus(int jobApplicationId, JobApplicationStatus status);
    Task<bool> CreateJobApply(JobApplication jobApplication);
    Task<List<JobApplication>> GetJobApplicationsByUserId(int id);
    Task<List<JobApplication>> GetJobApplicationsByAdvertisementId(int id);
    Task<bool> DeleteJobApplication(int jobApplicationId);
    
}