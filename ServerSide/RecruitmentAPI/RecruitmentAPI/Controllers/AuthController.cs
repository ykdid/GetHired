using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using RecruitmentAPI.Models.Response;
using RecruitmentAPI.Services.Abstractions;

namespace RecruitmentAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : Controller
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<LoginResponse> LoginAsync([FromBody] LoginRequest request)
    {
        return await _authService.LoginAsync(request);
    }
}