using RecruitmentAPI.Entities;
using RecruitmentAPI.Enums;

namespace RecruitmentAPI.Services.JobAdvertisementService;

public interface IJobAdvertisementService
{
    Task<bool> CreateAdvertisement(JobAdvertisement advertisement);
    Task<JobAdvertisement> GetAdvertisementByJobAdvertisementId(int id);
    Task<List<JobAdvertisement>> GetAdvertisementsByEmployerId(int employerId);
    Task<List<JobAdvertisement>> GetAllAdvertisements(int userId);
    Task<bool> DeleteAdvertisement(int advertisementId);
    Task<JobAdvertisement> UpdateAdvertisement(int id,JobAdvertisement updatedAdv);
    Task<List<JobAdvertisement>> GetFilteredJobAdvertisements(int userId, TypesOfEmployment employmentType);

}   