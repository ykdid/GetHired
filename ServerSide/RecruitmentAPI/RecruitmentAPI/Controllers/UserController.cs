using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Services.Abstractions;
using RecruitmentAPI.Services.AuthService;
using RecruitmentAPI.Services.UserServices;

namespace RecruitmentAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(RecruitmentDbContext context, IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("addUser")]
        public async Task<IActionResult> CreateUser(User user)
        {
            var result = await _userService.CreateUser(user);

            if (result)
            {
                return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
            }
            
            return BadRequest("User could not created.");
        }

        [HttpGet("getUserById/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetUserById(id);
            
            return Ok(user);
            
        }

        [HttpPatch("updateUser/{id}")]
        public async Task<IActionResult> UpdateUser(User updatedUser)
        {
          
           var user = await _userService.UpdateUser(updatedUser);

           return Ok();
        }
/*
        [HttpPost("addUser")]
        public async Task<ActionResult<User>> CreateUser(User user)
        {

            if (string.IsNullOrEmpty(user.Name))
            {
                return BadRequest("User information missing.");
            }

            var result = await _authService.CreateUser(user);

            return Ok(result ? "Ekleme Basarili" : "Ekleme Basarisiz!");
        }


        [HttpGet("UserProfile{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _authService.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        [HttpPatch("UserUpdate{id}")]
        public async Task<IActionResult> UpdateUser(User updatedUser)
        {

            var user = await _context.Users.FindAsync(updatedUser.Id);
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
        public async Task<ActionResult<IEnumerable<BackOfficeJobListing>>> GetJobList()
        {
            var jobListing = await _context.BackOfficeJobListings.ToListAsync();
            return Ok(jobListing);
        }


        [HttpPost("applyJob")]
        public async Task<ActionResult<JobApplication>> ApplyJob(JobApplication application)
        {
            if (application == null)
            {
                return BadRequest("Job did not found");
            }

            var job = _context.BackOfficeJobListings.FindAsync(application.BackOfficeJobListingId);
            if (job == null)
            {
                return NotFound("Job did not found");
            }

            var user = _context.Users.FindAsync(application.UserId);
            if (user == null)
            {
                return NotFound("User did not found");
            }

            _context.JobApplications.Add(application);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserApplications), new { id = application.Id }, application);
        }

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

            if (appToDelete == null)
            {
                return NotFound();
            }

            _context.JobApplications.Remove(appToDelete);
            await _context.SaveChangesAsync();

            return Ok();
        }*/
    }
}