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
    public class ApplicationUserController : ControllerBase
    {
        private readonly RecruitmentDbContext _context;

        public ApplicationUserController(RecruitmentDbContext context)
        {
            _context = context;
        }

       
        [HttpPost("AddUser")]
        public async Task<ActionResult<ApplicationUser>> CreateUser(ApplicationUser user)
        {
            if (user == null)
            {
                return BadRequest("User bilgileri eksik.");
            }

            _context.ApplicationUsers.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

       
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUserById(int id)
        {
            var user = await _context.ApplicationUsers.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

       
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateUser(int id, ApplicationUser updatedUser)
        {
            if (id != updatedUser.Id)
            {
                return BadRequest();
            }

            var user = await _context.ApplicationUsers.FindAsync(id);
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

        
        [HttpGet("{id}/Applications")]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetUserApplications(int id)
        {
            var applications = await _context.JobApplications
                .Include(ja => ja.BackOfficeJobListing)
                .Where(ja => ja.ApplicationUserId == id)
                .ToListAsync();

            if (applications == null)
            {
                return NotFound();
            }

            return Ok(applications);
        }
    }
}
