using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.EmployerService;

public interface IEmployerService
{
    Task<bool> CreateEmployer(Employer employer); 
    Task<Employer> GetEmployerById(int id);
    Task<Employer> UpdateEmployer(int id,Employer updateEmployer);
    Task<bool> UpdatePassword(int id, string currentPassword, string newPassword);
}