using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecruitmentAPI.Data;
using RecruitmentAPI.DTOs.Models;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Enums;
using RecruitmentAPI.Services.JobApplicationService;

namespace RecruitmentAPI.Controllers
{ 
    
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    
    public class JobApplicationController : Controller
    {
        private readonly IJobApplicationService _jobApplicationService;

        public JobApplicationController(RecruitmentDbContext context, IJobApplicationService jobApplicationService)
        {
            _jobApplicationService = jobApplicationService;
        }

        
        [HttpPost("applyJob")]
        
        public async Task<IActionResult> CreateJobApply(JobApplication jobApplication)
        {
            var result = await _jobApplicationService.CreateJobApply(jobApplication);

            if (result)
            {
                return CreatedAtAction(nameof(GetJobApplicationsByUserId), new { id = jobApplication.UserId }, jobApplication);
            }
            
            return BadRequest("Job application could not be created.");
        }

        
        [HttpGet("getJobApplicationsByUser/{id}")]
        
        public async Task<IActionResult> GetJobApplicationsByUserId(int id)
        {
            var jobApplications = await _jobApplicationService.GetJobApplicationsByUserId(id);

            if (jobApplications == null)
            {
                return NotFound();
            }

            return Ok(jobApplications);
        }
        
        
        [HttpGet("getJobApplicationsByAdvertisement/{id}")]
        
        public async Task<IActionResult> GetJobApplicationsByAdvertisementId(int id)
        {
            var jobApplications = await _jobApplicationService.GetJobApplicationsByAdvertisementId(id);

            if (jobApplications == null)
            {
                return NotFound();
            }

            return Ok(jobApplications);
        }

        
        [HttpDelete("getJobApplicationByUser/{jobApplicationId}")]
        
        public async Task<IActionResult> DeleteJobApplication(int jobApplicationId)
        {
            var result = await _jobApplicationService.DeleteJobApplication(jobApplicationId);

            if (result)
            {
                NoContent();
            }

            return Ok();
        }

       
        [HttpPatch("{jobApplicationId}/status")]
        
        public async Task<IActionResult> UpdateJobApplicationStatus(int jobApplicationId, [FromBody] UpdateJobApplicationStatusRequest request)
        {
            try
            {
                await _jobApplicationService.UpdateJobApplicationStatus(jobApplicationId, request.Status);
                return Ok("Job application status updated successfully.");
            }
            catch (KeyNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}

