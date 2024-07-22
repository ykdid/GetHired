using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using RecruitmentAPI.Models;
using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;
using System.Linq;
using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployerController : ControllerBase
    {
        private readonly RecruitmentDbContext _context;

        public EmployerController(RecruitmentDbContext context)
        {
            _context = context;
        }

        
        [HttpPost("AddEmployer")]
        public async Task<ActionResult<Employer>> CreateEmployer(Employer employer)
        {
            if (employer == null)
            {
                return BadRequest("Employer information missing.");
            }
            
            _context.Employers.Add(employer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployerById), new { id = employer.Id }, employer);
        }

       
        [HttpGet("EmployerProfile/{id}")]
        public async Task<ActionResult<Employer>> GetEmployerById(int id)
        {
            var employer = await _context.Employers.FindAsync(id);
            if (employer == null)
            {
                return NotFound();
            }

            return Ok(employer);
        }

        
        [HttpPatch("EmployerUpdate{id}")]
        public async Task<IActionResult> UpdateEmployer(int id, Employer updatedEmployer)
        {
            if (id != updatedEmployer.Id)
            {
                return BadRequest();
            }

            var employer = await _context.Employers.FindAsync(id);
            if (employer == null)
            {
                return NotFound();
            }

            employer.Name = updatedEmployer.Name ?? employer.Name;
            employer.Surname = updatedEmployer.Surname ?? employer.Surname;
            employer.Email = updatedEmployer.Email ?? employer.Email;
            employer.Password = updatedEmployer.Password ?? employer.Password;
            employer.CompanyName = updatedEmployer.CompanyName ?? employer.CompanyName;
            employer.EmployerImagePath = updatedEmployer.EmployerImagePath ?? employer.EmployerImagePath;

            await _context.SaveChangesAsync();

            return NoContent();
        }

       
        [HttpPost("PostJob")]
        public async Task<ActionResult<BackOfficeJobListing>> CreateJobListing(BackOfficeJobListing jobListing)
        {
            if (jobListing == null)
            {
                return BadRequest("Job Listing bilgileri eksik.");
            }

            _context.BackOfficeJobListings.Add(jobListing);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction(nameof(GetJobListingById), new { id = jobListing.Id }, jobListing);
        }

        
        [HttpGet("MyAdvertisements/{employerId}")]
        public async Task<ActionResult<IEnumerable<BackOfficeJobListing>>> GetAdvertisementsByEmployer(int employerId)
        {
            var advertisements = await _context.BackOfficeJobListings
                .Where(bjl => bjl.EmployerId == employerId)
                .ToListAsync();

            if (advertisements == null)
            {
                return NotFound();
            }

            return Ok(advertisements);
        }

      
        [HttpGet("Job/{id}")]
        public async Task<ActionResult<BackOfficeJobListing>> GetJobListingById(int id)
        {
            var jobListing = await _context.BackOfficeJobListings.FindAsync(id);
            if (jobListing == null)
            {
                return NotFound();
            }

            return Ok(jobListing);
        }
 
       
        [HttpGet("Job/{jobId}/Applications")]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetJobApplications(int jobId)
        {
            var applications = await _context.JobApplications
                .Include(ja => ja.User)
                .Where(ja => ja.BackOfficeJobListingId == jobId)
                .ToListAsync();

            if (applications == null)
            {
                return NotFound();
            }

            return Ok(applications);
        }

        
        [HttpGet("MyStaff/{employerId}")]
        public async Task<ActionResult<IEnumerable<User>>> GetStaffByEmployer(int employerId)
        {
            var staff = await _context.Users
                .Where(au => au.EmployerId == employerId)
                .ToListAsync();

            if (staff == null)
            {
                return NotFound();
            }

            return Ok(staff);
        }

        [HttpGet("EmployeeFilter/{employer.Id}")]

        public async Task<ActionResult<IEnumerable<User>>> GetEmployeesWithFilter(
            string? name = null,
            string? surname = null,
            string? regNo = null,
            string? identityNo = null
        )
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrEmpty(identityNo))
            {
                query = query.Where(x => x.IdentityNumber == identityNo);
            }

            if (!string.IsNullOrEmpty(regNo))
            {
                query = query.Where(x => x.RegistrationNumber == regNo);

            }

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(x => x.Name == name);
            }

            if (!string.IsNullOrEmpty(surname))
            {
                query = query.Where(x => x.Surname == surname);
            }

            var result = await query.ToListAsync();

            return Ok(result);

        }
        
        [HttpGet("GetEmployeeById/{id}")]
        public async Task<ActionResult<Employee>> GetEmployeeById(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }


        [HttpPost("AddEmployee")]
        public async Task<ActionResult<User>> CreateEmployee(Employee employee)
        {
            if (employee == null)
            {
                return BadRequest("Employee information's missing.");
            }

            var newEmployee = new Employee()
            {
                Name = employee.Name,
                Surname = employee.Surname,
                Email = employee.Email,
                JobType = employee.JobType,
                EmployerId = employee.EmployerId,
                RegistrationNumber = employee.RegistrationNumber,
                IdentityNumber = employee.IdentityNumber
            };

            _context.Employees.Add(newEmployee);
            await _context.SaveChangesAsync();
    
            return CreatedAtAction(nameof(GetEmployeeById), new { id = newEmployee.Id }, newEmployee);
        }
        
        [HttpGet("getEmployeesByEmployer/{employerId}")]
        public async Task<IActionResult> GetEmployeesByEmployer(int employerId)
        {
            var employees = await _context.Employees
                .Where(e => e.EmployerId == employerId)
                .ToListAsync();

            if (employees == null || !employees.Any())
            {
                return NotFound("No employees found for the specified employer.");
            }

            return Ok(employees);
        }


    }
}
