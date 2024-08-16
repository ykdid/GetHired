using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Services.EncryptionService;

namespace RecruitmentAPI.Services.EmployerService;

public class EmployerService:IEmployerService
{
    private readonly RecruitmentDbContext _context;
    private readonly IEncryptionService _encryptionService;

    public EmployerService(RecruitmentDbContext context , IEncryptionService encryptionService)
    {
        _context = context;
        _encryptionService = encryptionService;
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

        employer.Email = _encryptionService.Decrypt(employer.Email);
        
        return employer;

    }
    public async Task<Employer> UpdateEmployer(int id,Employer updatedEmployer)
    {
        var employer = await _context.Employers.FindAsync(id);

        if (employer == null)
        {
            throw new KeyNotFoundException($"{updatedEmployer} was not found.");
        }

        employer.Name = updatedEmployer.Name ?? employer.Name;
        employer.Surname = updatedEmployer.Surname ?? employer.Surname;
        employer.EmployerImagePath = updatedEmployer.EmployerImagePath ?? employer.EmployerImagePath;,
            
        if (!string.IsNullOrEmpty(updatedEmployer.Email))
        {
            employer.Email = _encryptionService.Encrypt((updatedEmployer.Email));
        }
        
        if (!string.IsNullOrEmpty(updatedEmployer.HashPassword))
        {
            employer.HashPassword = _encryptionService.Hash(updatedEmployer.HashPassword);
        }
       

        await _context.SaveChangesAsync();

        return employer;
    }
}