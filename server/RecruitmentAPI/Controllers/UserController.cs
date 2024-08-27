using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using RecruitmentAPI.DTOs.Models;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Services.UserService;

namespace RecruitmentAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(RecruitmentDbContext context, IUserService userService)
        {
            _userService = userService;
        }
        
        [AllowAnonymous]
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
        
        public async Task<IActionResult> UpdateUser(int id, User updatedUser)
        {
            try
            {
                var user = await _userService.UpdateUser(id, updatedUser);
                if (user == null)
                {
                    return NotFound($"Employer with id {id} was not found.");
                }

                return Ok(user);
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
                var result = await _userService.UpdatePassword(id, passwordChangeModel.CurrentPassword, passwordChangeModel.NewPassword);

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