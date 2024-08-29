using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.EmployeeService;

public class EmployeeService : IEmployeeService
{
    private readonly RecruitmentDbContext _context;

    public EmployeeService(RecruitmentDbContext context)
    {
        _context = context;
    }

    public async Task<bool> CreateEmployee(Employee employee)
    {
        _context.Employees.Add(employee);
        
        var result = await _context.SaveChangesAsync();

        return result > 0;
    }

    public async Task<Employee> GetEmployeeById(int id)
    {
        var employee = await _context.Employees.FindAsync(id);

        if (employee == null)
        {
            throw new KeyNotFoundException($"Employee with id {id} was not found.");
        }

        return employee;
    }

    public async Task<bool> DeleteEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        
        if (employee == null)
        {
            throw new KeyNotFoundException($"Employee with id {id} was not found.");
        }

        _context.Employees.Remove(employee);
        var result = await _context.SaveChangesAsync();

         return result > 0;
    }

    public async Task<List<Employee>> GetEmployeesByEmployer(int employerId)
    {
        return await _context.Employees
            .Where(e => e.EmployerId == employerId)
            .OrderBy(e => e.Id)
            .ToListAsync();
    }

    public async Task<List<Employee>> GetFilteredEmployees(
        int employerId,
        string? name = null,
        string? surname = null,
        string? email = null,
        string? regNo = null,
        string? identityNo = null
        )
    {
        var query = _context.Employees
            .Where(e => e.EmployerId == employerId)
            .AsQueryable();

        if (!string.IsNullOrEmpty(name))    
        {
            query = query.Where(e => e.Name.Contains(name) );
        }

        if (!string.IsNullOrEmpty(surname))
        {
            query = query.Where(e => e.Surname.Contains(surname));
        }
        
        if (!string.IsNullOrEmpty(email))
        {
            query = query.Where(e => e.Email.Contains(email));
        }

        if (!string.IsNullOrEmpty(regNo))
        {
            query = query.Where(e => e.RegistrationNumber.Contains(regNo));
        }

        if (!string.IsNullOrEmpty(identityNo))
        {
            query = query.Where(e => e.IdentityNumber.Contains(identityNo));
        }

        return await query.ToListAsync();
    }

    public async Task<Employee> UpdateEmployee(int id,Employee updatedEmployee)
    {
        var employee = await _context.Employees.FindAsync(id);
        
        if (employee == null)
        {
            throw new KeyNotFoundException($"{updatedEmployee} was not found.");
        }

        employee.IdentityNumber = updatedEmployee.IdentityNumber ?? employee.IdentityNumber;
        employee.RegistrationNumber = updatedEmployee.RegistrationNumber ?? employee.RegistrationNumber;
        employee.Name = updatedEmployee.Name ?? employee.Name;
        employee.Surname = updatedEmployee.Surname ?? employee.Surname;

        await _context.SaveChangesAsync();

        return employee;
        
    }
    
}