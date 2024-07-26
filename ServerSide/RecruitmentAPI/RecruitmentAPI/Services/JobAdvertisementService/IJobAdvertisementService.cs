using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.JobAdvertisementService;

public interface IJobAdvertisementService
{
    Task<bool> CreateAdvertisement(JobAdvertisement advertisement);
    Task<List<JobAdvertisement>> GetAdvertisementsByEmployerId(int employerId);
    Task<List<JobAdvertisement>> GetAllAdvertisements();
    Task<bool> DeleteAdvertisement(int advertisementId);
    Task<JobAdvertisement> UpdateAdvertisement(JobAdvertisement updatedAdv);
    
}   