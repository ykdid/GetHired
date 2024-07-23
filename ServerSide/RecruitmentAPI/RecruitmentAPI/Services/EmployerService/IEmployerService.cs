using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.EmployerService;

public interface IEmployerService
{
    Task<bool> CreateEmployer(Employer employer);
    Task<Employer> GetEmployerById(int id);
    Task<Employer> UpdateEmployer(Employer updateEmployer);
}