using Microsoft.AspNetCore.Identity.Data;
using RecruitmentAPI.Models.Response;
using RecruitmentAPI.Repositories.Abstractions;
using RecruitmentAPI.Services.Abstractions;

namespace RecruitmentAPI.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;

    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var result = new LoginResponse();
        var user = _userRepository.GetUserByEmailAsync(request.Email);

        
        return result;
    }
}