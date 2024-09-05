using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Enums;
using RecruitmentAPI.Services.JobAdvertisementService;

namespace RecruitmentAPI.Controllers
{   
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    
    
    public class JobAdvertisementController : Controller
    {
        private readonly IJobAdvertisementService _jobAdvertisementService;

        public JobAdvertisementController(RecruitmentDbContext context, IJobAdvertisementService jobAdvertisementService)
        {
            _jobAdvertisementService = jobAdvertisementService;
        }
       
        
        [HttpPost("addJobAdvertisement")]
        
        public async Task<IActionResult> CreateJobAdvertisement( JobAdvertisement jobAdvertisement)
        {
            var result = await _jobAdvertisementService.CreateAdvertisement(jobAdvertisement);

            if (result)
            {
                return CreatedAtAction(nameof(GetAdvertisementsByEmployerId), new { employerId = jobAdvertisement.EmployerId }, jobAdvertisement);
            }
            
            return BadRequest("Advertisement could not created.");
        }
        
        [HttpGet("getJobAdvertisementsByJobAdvertisementId/{id}")]
        public async Task<IActionResult> GetAdvertisementByJobAdvertisementId(int id)
        {
            var advertisement = await _jobAdvertisementService.GetAdvertisementByJobAdvertisementId(id);

            if (advertisement == null )
            {
                return NoContent(); 
            }

            return Ok(advertisement);
        }
        
        [HttpGet("getJobAdvertisementsByEmployer/{employerId}")]
        public async Task<IActionResult> GetAdvertisementsByEmployerId(int employerId)
        {
            var advertisement = await _jobAdvertisementService.GetAdvertisementsByEmployerId(employerId);

            if (advertisement == null || advertisement.Count == 0)
            {
                return NoContent(); 
            }

            return Ok(advertisement);
        }
        
        
        [HttpGet("getAllJobAdvertisements/{userId}")]
        
        public async Task<IActionResult> GetAllJobAdvertisements(int userId)
        {
            var advertisement = await _jobAdvertisementService.GetAllAdvertisements(userId);

            if (advertisement == null)
            {
                return NotFound($"Advertisements were not found.");
            }

            return Ok(advertisement);
        }
        
        [HttpGet("getFilteredJobAdvertisements/{userId}")]
        public async Task<IActionResult> GetFilteredJobAdvertisements(int userId, TypesOfEmployment employmentType)
        {
            try
            {
                var filteredAdvertisements = await _jobAdvertisementService.GetFilteredJobAdvertisements(userId, employmentType);
                
                if (filteredAdvertisements == null || !filteredAdvertisements.Any())
                {
                    return NotFound("No job advertisements found with the given filters.");
                }

                return Ok(filteredAdvertisements);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        
        [HttpDelete("deleteAdvertisement/{advertisementId}")]
        
        public async Task<IActionResult> DeleteAdvertisement(int advertisementId)
        {
            var result = await _jobAdvertisementService.DeleteAdvertisement(advertisementId);

            if (!result)
            {
                return NotFound($"Advertisement with id {advertisementId} was not found.");
            }

            return NoContent();
        }
        
        [HttpPatch("updateAdvertisement/{id}")]
        
        public async Task<IActionResult> UpdateAdvertisement(int id, JobAdvertisement updatedAdv)
        {
            try
            { 
                var adv = await _jobAdvertisementService.UpdateAdvertisement(id ,updatedAdv);
                if (adv == null)
                {
                  return  NotFound($"Advertisement with id {id} was not found");
                }

                return Ok(adv);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
