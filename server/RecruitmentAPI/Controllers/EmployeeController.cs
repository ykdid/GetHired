using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Services.EmployeeService;
using RecruitmentAPI.Services.JobAdvertisementService;

namespace RecruitmentAPI.Controllers
{
    
[Route("api/[controller]")]
[ApiController]


    public class EmployeeController : Controller
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(RecruitmentDbContext context, IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }
        
        [HttpPost("addEmployee")]

        public async Task<IActionResult> CreateEmployee(Employee employee)
        {
            var result = await _employeeService.CreateEmployee(employee);

            if (result)
            {
                return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.Id }, employee);
            }

            return BadRequest("Employee could not created.");
        }
        
        [HttpGet("getEmployeeBy{id}")]
        
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _employeeService.GetEmployeeById(id);
            
            return Ok(employee);
            

        }
        
        [HttpDelete("deleteEmployee")]
        
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var result = await _employeeService.DeleteEmployee(id);

            if (result)
            {
                NoContent();
            }

            return Ok();
        }
        
        [HttpGet("getEmployeesByEmployer/{employerId}")]
        
        public async Task<IActionResult> GetEmployeesByEmployer(int employerId)
        {
            var employees = await _employeeService.GetEmployeesByEmployer(employerId);

            if (employees == null)
            {
                NotFound();
            }

            return Ok(employees);
        }
        
        [HttpGet("getFilteredEmployees")]
        
        public async Task<IActionResult> GetFilteredEmployees(
            [FromQuery] string? name = null,
            [FromQuery] string? surname = null,
            [FromQuery] string? regNo = null,
            [FromQuery] string? identityNo = null)
        {
            var employees = await _employeeService.GetFilteredEmployees(name, surname, regNo, identityNo);

            if (employees == null)
            {
                return NotFound();
            }

            return Ok(employees);
        }
        
        [HttpPatch("updateEmployee")]
        
        public async Task<IActionResult> UpdateEmplyoee(Employee updatedEmployee)
        {
            if (updatedEmployee == null)
            {
                return BadRequest("Employee data must be provided.");
            }

            try
            {
                var employee = await _employeeService.UpdateEmployee(updatedEmployee);
                return Ok(employee);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
        
    }
    
}

    