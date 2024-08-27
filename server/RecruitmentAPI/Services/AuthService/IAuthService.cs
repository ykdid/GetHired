    using Microsoft.AspNetCore.Identity.Data;
    using RecruitmentAPI.DTOs.Models;
    using RecruitmentAPI.Entities;



    namespace RecruitmentAPI.Services.AuthService;

    public interface IAuthService
    {
        Task<AuthResponse> LoginUser(UserLoginRequest request);
        Task<AuthResponse> RegisterUser(UserRegisterRequest request);
        Task<AuthResponse> LoginEmployer(EmployerLoginRequest request);
        Task<AuthResponse> RegisterEmployer(EmployerRegisterRequest request);
    }
       