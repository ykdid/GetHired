using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;
using RecruitmentAPI.DTOs.Models;

using RecruitmentAPI.Services.EncryptionService;

namespace RecruitmentAPI.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly RecruitmentDbContext _context;
        private readonly IEncryptionService _encryptionService;
        private readonly IConfiguration _configuration;

        public AuthService(RecruitmentDbContext context, IEncryptionService encryptionService, IConfiguration configuration)
        {
            _context = context;
            _encryptionService = encryptionService;
            _configuration = configuration;
        }

        public async Task<AuthResponse> LoginUser(UserLoginRequest request)
        {
            var hashedPassword = _encryptionService.Hash(request.Password);
            var email = _encryptionService.Encrypt(request.Email);
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email && u.HashPassword == hashedPassword);

            if (user == null)
                return new AuthResponse { IsSuccess = false, ErrorMessage = "Invalid email or password" };

            var token = GenerateJwtToken(user.Email ,userId: user.Id);
            return new AuthResponse
            {
                IsSuccess = true,
                Token = token,
                UserId = user.Id 
            };;
        }

        public async Task<AuthResponse> RegisterUser(UserRegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == _encryptionService.Encrypt(request.Email)))
                return new AuthResponse { IsSuccess = false, ErrorMessage = "Email already exists" };

            var user = new User
            {
                Name = request.Name,
                Surname = request.Surname,
                Email = _encryptionService.Encrypt(request.Email),
                PhoneNumber = _encryptionService.Encrypt(request.PhoneNumber),
                HashPassword = _encryptionService.Hash(request.Password),
                Age = request.Age,
                RegistrationNumber = request.RegistrationNumber,
                IdentityNumber = request.IdentityNumber
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user.Email , userId: user.Id);
            return new AuthResponse
            {
                IsSuccess = true, 
                Token = token,
                UserId = user.Id
            };
        }

        public async Task<AuthResponse> LoginEmployer(EmployerLoginRequest request)
        {
            var hashedPassword = _encryptionService.Hash(request.Password);
            var email = _encryptionService.Encrypt(request.Email);  
                var employer = await _context.Employers
                .FirstOrDefaultAsync(e => e.Email.Equals(email) && e.HashPassword.Equals(hashedPassword));

            if (employer == null)
                return new AuthResponse { IsSuccess = false, ErrorMessage = "Invalid email or password" };

            var token = GenerateJwtToken(employer.Email ,employerId: employer.Id);
            return new AuthResponse
            {
                IsSuccess = true,
                Token = token,
                EmployerId = employer.Id 
            };
        }

        public async Task<AuthResponse> RegisterEmployer(EmployerRegisterRequest request)
        {
            if (await _context.Employers.AnyAsync(e => e.Email == _encryptionService.Encrypt(request.Email)))
                return new AuthResponse { IsSuccess = false, ErrorMessage = "Email already exists" };

            var employer = new Employer
            {
                Name = request.Name,
                Surname = request.Surname,
                Email = _encryptionService.Encrypt(request.Email),
                HashPassword =_encryptionService.Hash(request.Password),
                CompanyName = request.CompanyName
            };

            _context.Employers.Add(employer);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(employer.Email , employerId: employer.Id);
            return new AuthResponse
            {
                IsSuccess = true,
                Token = token,
                EmployerId = employer.Id 
            };
        }
    
        private string GenerateJwtToken(string email, int? userId = null, int? employerId = null)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, email)
            };

            if (userId.HasValue)
            {
                claims.Add(new Claim("userId", userId.Value.ToString()));
            }

            if (employerId.HasValue)
            {
                claims.Add(new Claim("employerId", employerId.Value.ToString()));
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpiryInMinutes"])),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
