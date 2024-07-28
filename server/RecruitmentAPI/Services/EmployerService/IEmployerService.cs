using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.EmployerService;

public interface IEmployerService
{
    Task<bool> CreateEmployer(Employer employer); // add employer duzenle
    Task<Employer> GetEmployerById(int id);
    Task<Employer> UpdateEmployer(int id,Employer updateEmployer);
}