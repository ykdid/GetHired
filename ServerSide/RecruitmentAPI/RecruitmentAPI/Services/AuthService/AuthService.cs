using Microsoft.AspNetCore.Identity.Data;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Models.Response;
using RecruitmentAPI.Services.Abstractions;

namespace RecruitmentAPI.Services.AuthService;

public class AuthService : IAuthService
{
    private readonly RecruitmentDbContext _context;

    public AuthService(RecruitmentDbContext context)
    {
        _context = context;
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var result = new LoginResponse();
        
        return result;
    }

    
    
}