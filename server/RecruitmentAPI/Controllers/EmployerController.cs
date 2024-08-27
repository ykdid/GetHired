using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using RecruitmentAPI.DTOs.Models;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Services.EmployerService;

namespace RecruitmentAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    
    
   public class EmployerController : ControllerBase
    {
        private readonly IEmployerService _employerService;

        public EmployerController(RecruitmentDbContext context , IEmployerService employerService)
        {
            _employerService = employerService;
        }
        
        
        [HttpPost("addEmployer")]
        public async Task<IActionResult> CreateEmployer(Employer employer)
        {
            var result = await _employerService.CreateEmployer(employer);

            if (result)
            {
                return CreatedAtAction(nameof(GetEmployerById), new { id = employer.Id}, employer );
            }

            return BadRequest("Employer could not created.");
        }
        
        [HttpGet("getEmployerById/{id}")]
        
        public async Task<IActionResult> GetEmployerById(int id)
        {
            var employer = await _employerService.GetEmployerById(id);

            return Ok(employer);
        }
        
        [HttpPatch("updateEmployer/{id}")]
        public async Task<IActionResult> UpdateEmployer(int id, [FromBody] Employer updatedEmployer)
        {
            try
            {
                var employer = await _employerService.UpdateEmployer(id, updatedEmployer);
                if (employer == null)
                {
                    return NotFound($"Employer with id {id} was not found.");
                }

                return Ok(employer);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
        
        [HttpPatch("changePassword/{id}")]
        public async Task<IActionResult> ChangePassword(int id, [FromBody] PasswordChangeModel passwordChangeModel)
        {
            try
            {
                var result = await _employerService.UpdatePassword(id, passwordChangeModel.CurrentPassword, passwordChangeModel.NewPassword);

                if (result)
                {
                    return Ok("Password changed successfully.");
                }
                else
                {
                    return BadRequest("Failed to change password.");
                }
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
