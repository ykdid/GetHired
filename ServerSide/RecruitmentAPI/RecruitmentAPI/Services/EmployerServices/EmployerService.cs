using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.EmployerServices;

public class EmployerService:IEmployerService
{
    private readonly RecruitmentDbContext _context;

    public EmployerService(RecruitmentDbContext context)
    {
        _context = context;
    }
    
    public async Task<bool> CreateEmployer(Employer employer)
    {
        _context.Employers.Add(employer);

        var result = await _context.SaveChangesAsync();

        return result > 0;
    }

    public async Task<Employer> GetEmployerById(int id)
    {
        var employer = await _context.Employers.FindAsync(id);
        
        if (employer == null)
        {
            throw new KeyNotFoundException($"User with id {id} was not found.");
        }
        
        return employer;

    }
    public async Task<Employer> UpdateEmployer(Employer updatedEmployer)
    {
        var employer = await _context.Employers.FindAsync(updatedEmployer.Id);

        if (employer == null)
        {
            throw new KeyNotFoundException($"{updatedEmployer} was not found.");
        }

        employer.Name = updatedEmployer.Name ?? employer.Name;
        employer.Surname = updatedEmployer.Surname ?? employer.Surname;
        employer.EmployerImagePath = updatedEmployer.EmployerImagePath ?? employer.EmployerImagePath;
        employer.Email = updatedEmployer.Email ?? employer.Email;
        employer.Password = updatedEmployer.Password ?? employer.Password;
       

        await _context.SaveChangesAsync();

        return employer;
    }
}