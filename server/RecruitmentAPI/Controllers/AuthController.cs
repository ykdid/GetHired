using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecruitmentAPI.DTOs.Models;
using RecruitmentAPI.Services.AuthService;


namespace RecruitmentAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login/user")]
        public async Task<IActionResult> LoginUser(UserLoginRequest request)
        {
            var response = await _authService.LoginUser(request);
            if (!response.IsSuccess)
                return BadRequest(response.ErrorMessage);

            return Ok(new { Token = response.Token ,UserId = response.UserId});
        }

        [HttpPost("register/user")]
        public async Task<IActionResult> RegisterUser(UserRegisterRequest request)
        {
            var response = await _authService.RegisterUser(request);
            if (!response.IsSuccess)
                return BadRequest(response.ErrorMessage);

            return Ok(new { Token = response.Token , UserId = response.UserId});
        }

        [HttpPost("login/employer")]
        public async Task<IActionResult> LoginEmployer(EmployerLoginRequest request)
        {
            var response = await _authService.LoginEmployer(request);
            if (!response.IsSuccess)    
                return BadRequest(response.ErrorMessage);

            return Ok(new { Token = response.Token, EmployerId = response.EmployerId });
        }

        [HttpPost("register/employer")]
        public async Task<IActionResult> RegisterEmployer(EmployerRegisterRequest request)
        {
            var response = await _authService.RegisterEmployer(request);
            if (!response.IsSuccess)
                return BadRequest(response.ErrorMessage);

            return Ok(new { Token = response.Token, EmployerId = response.EmployerId });
        }
    }
}