using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Services.UserService;

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
                Console.WriteLine(ex);
                return NotFound(ex.Message);
            }
            
        }
    }
}