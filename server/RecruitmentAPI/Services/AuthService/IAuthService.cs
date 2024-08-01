    using Microsoft.AspNetCore.Identity.Data;
    using RecruitmentAPI.Entities;
    using RecruitmentAPI.Services.AuthService.DTOs.Models;


    namespace RecruitmentAPI.Services.AuthService;

    public interface IAuthService
    {
        Task<AuthResponse> LoginUser(UserLoginRequest request);
        Task<AuthResponse> RegisterUser(UserRegisterRequest request);
        Task<AuthResponse> LoginEmployer(EmployerLoginRequest request);
        Task<AuthResponse> RegisterEmployer(EmployerRegisterRequest request);
    }
       