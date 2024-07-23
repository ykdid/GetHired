using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.EmployerServices;

public interface IEmployerService
{
    Task<bool> CreateEmployer(Employer employer);
    Task<Employer> GetEmployerById(int id);
    Task<Employer> UpdateEmployer(Employer updateEmployer);
}