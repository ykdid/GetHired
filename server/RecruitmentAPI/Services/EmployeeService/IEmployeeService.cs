namespace RecruitmentAPI.Services.EmployeeService;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;
public interface IEmployeeService
{
    Task<bool> CreateEmployee(Employee employee);
    Task<Employee> GetEmployeeById(int id);
    Task<bool> DeleteEmployee(int id);
    Task<List<Employee>> GetEmployeesByEmployer(int employerId);
    Task<List<Employee>> GetFilteredEmployees( //liste dön aynı isimden olabilir.
        string? name = null,
        string? surname = null,
        string? regNo = null,
        string? identityNo = null
    );
    Task<Employee> UpdateEmployee(Employee updatedEmployee); // duzenle
}