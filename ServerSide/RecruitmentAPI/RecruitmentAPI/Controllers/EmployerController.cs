using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using RecruitmentAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        // İşveren ekler
        [HttpPost("AddEmployer")]
        public async Task<ActionResult<Employer>> CreateEmployer(Employer employer)
        {
            if (employer == null)
            {
                return BadRequest("Employer bilgileri eksik.");
            }

            _context.Employers.Add(employer);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployerById), new { id = employer.Id }, employer);
        }

        // İşveren bilgilerini getirir
        [HttpGet("{id}")]
        public async Task<ActionResult<Employer>> GetEmployerById(int id)
        {
            var employer = await _context.Employers.FindAsync(id);
            if (employer == null)
            {
                return NotFound();
            }

            return Ok(employer);
        }

        // İşveren bilgilerini günceller
        [HttpPatch("{id}")]
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

        // İlan oluşturur
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

        // İlanları getirir
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

        // İlanı getirir
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

        // İlan başvurularını getirir
        [HttpGet("Job/{jobId}/Applications")]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetJobApplications(int jobId)
        {
            var applications = await _context.JobApplications
                .Include(ja => ja.ApplicationUser)
                .Where(ja => ja.BackOfficeJobListingId == jobId)
                .ToListAsync();

            if (applications == null)
            {
                return NotFound();
            }

            return Ok(applications);
        }

        // Çalışanları getirir
        [HttpGet("MyStaff/{employerId}")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetStaffByEmployer(int employerId)
        {
            var staff = await _context.ApplicationUsers
                .Where(au => au.EmployerId == employerId)
                .ToListAsync();

            if (staff == null)
            {
                return NotFound();
            }

            return Ok(staff);
        }
    }
}
