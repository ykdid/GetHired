using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Services.JobAdvertisementService;

namespace RecruitmentAPI.Controllers
{
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
        [Authorize]
        public async Task<IActionResult> CreateJobAdvertisement(JobAdvertisement jobAdvertisement)
        {
            var result = await _jobAdvertisementService.CreateAdvertisement(jobAdvertisement);

            if (result)
            {
                return CreatedAtAction(nameof(GetAdvertisementsByEmployerId), new { employerId = jobAdvertisement.EmployerId }, jobAdvertisement);
            }
            
            return BadRequest("Advertisement could not created.");
        }
        
        
        [HttpGet("getJobAdvertisementsByEmployer/{employerId}")]
        [Authorize]
        public async Task<IActionResult> GetAdvertisementsByEmployerId(int employerId)
        {
            var advertisement = await _jobAdvertisementService.GetAdvertisementsByEmployerId(employerId);

            if (advertisement == null || advertisement.Count == 0)
            {
                return NotFound($"Advertisements for employerId {employerId} were not found.");
            }

            return Ok(advertisement);
        }

        [HttpGet("getAllJobAdvertisements")]
        public async Task<IActionResult> GetAllJobAdvertisements()
        {
            var advertisement = await _jobAdvertisementService.GetAllAdvertisements();

            if (advertisement == null)
            {
                return NotFound($"Advertisements were not found.");
            }

            return Ok(advertisement);
        }
        
        [HttpDelete("deleteAdvertisement")]
        [Authorize]
        public async Task<IActionResult> DeleteAdvertisement(int advertisementId)
        {
            var result = await _jobAdvertisementService.DeleteAdvertisement(advertisementId);

            if (!result)
            {
                return NotFound($"Advertisement with id {advertisementId} was not found.");
            }

            return NoContent();
        }
        
        [HttpPatch("updateAdvertisement")]
        [Authorize]
        public async Task<IActionResult> UpdateAdvertisement(JobAdvertisement updatedAdv)
        {
            var adv = await _jobAdvertisementService.UpdateAdvertisement(updatedAdv);

            if (adv == null)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
