using Microsoft.AspNetCore.Identity.Data;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Models.Response;

namespace RecruitmentAPI.Services.Abstractions;

public interface IAuthService
{
    Task<LoginResponse> LoginAsync(LoginRequest request);

    Task<bool> CreateUser(User user);
}