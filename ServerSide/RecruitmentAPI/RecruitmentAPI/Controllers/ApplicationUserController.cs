using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private readonly RecruitmentDbContext _context;

        public ApplicationUserController(RecruitmentDbContext context)
        {
            _context = context;
        }

       
        [HttpPost("addUser")]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            if (user == null)
            {
                return BadRequest("User information missing.");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

       
        [HttpGet("UserProfile{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

       
        [HttpPatch("UserUpdate{id}")]
        public async Task<IActionResult> UpdateUser(int id, User updatedUser)
        {
            if (id != updatedUser.Id)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Name = updatedUser.Name ?? user.Name;
            user.Surname = updatedUser.Surname ?? user.Surname;
            user.Age = updatedUser.Age;
            user.UserProfileImagePath = updatedUser.UserProfileImagePath ?? user.UserProfileImagePath;
            user.Email = updatedUser.Email ?? user.Email;
            user.PhoneNumber = updatedUser.PhoneNumber ?? user.PhoneNumber;
            user.Password = updatedUser.Password ?? user.Password;
            user.CvFilePath = updatedUser.CvFilePath ?? user.CvFilePath;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        
        [HttpGet("JobListings")]
        public async Task<ActionResult<IEnumerable<BackOfficeJobListing>>> GetAllJobListings()
        {
            var jobListing = await _context.BackOfficeJobListings.ToListAsync();
            return Ok(jobListing);
        }
        
        [HttpPost("")]

        
        [HttpGet("{id}/Applications")]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetUserApplications(int id)
        {
            var applications = await _context.JobApplications
                .Include(ja => ja.BackOfficeJobListing)
                .Where(ja => ja.UserId == id)
                .ToListAsync();

            if (applications == null)
            {
                return NotFound();
            }

            return Ok(applications);
        }

        [HttpGet("JobTypeFilter/{jobtype}")]
        public async Task<ActionResult<IEnumerable<BackOfficeJobListing>>> GetFiltredJobByType(string jobtype)
        {
            var filtredJobs = await _context.BackOfficeJobListings
                .Where(jt => jt.JobType == jobtype)
                .ToListAsync();
            if (!filtredJobs.Any())
            {
                return NotFound();
            }

            return Ok(filtredJobs);
        }

        [HttpDelete("JobApplications/{id}")]
        public async Task<ActionResult<IEnumerable<JobApplication>>> DeleteApplication(int id)
        {
            var appToDelete = await _context.JobApplications.FindAsync(id);

            if (appToDelete  == null)
            {
                return NotFound();
            }

            _context.JobApplications.Remove(appToDelete);
            await _context.SaveChangesAsync();

            return Ok();
        }
        
    }
}
