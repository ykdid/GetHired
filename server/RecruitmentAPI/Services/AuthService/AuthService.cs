using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Services.AuthService.DTOs.Models;

namespace RecruitmentAPI.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly RecruitmentDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(RecruitmentDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AuthResponse> LoginUser(UserLoginRequest request)
        {
            var hashedPassword = HashPassword(request.Password);
            var test = Encrypt(request.Email);
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == test && u.HashPassword == hashedPassword);

            if (user == null)
                return new AuthResponse { IsSuccess = false, ErrorMessage = "Invalid email or   password" };

            var token = GenerateJwtToken(user.Email);
            return new AuthResponse { IsSuccess = true, Token = token };
        }

        public async Task<AuthResponse> RegisterUser(UserRegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
                return new AuthResponse { IsSuccess = false, ErrorMessage = "Email already exists" };

            var user = new User
            {
                Name = request.Name,
                Surname = request.Surname,
                Email = Encrypt(request.Email),
                PhoneNumber = Encrypt(request.PhoneNumber),
                HashPassword = HashPassword(request.Password),
                Age = request.Age,
                RegistrationNumber = request.RegistrationNumber,
                IdentityNumber = request.IdentityNumber
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(request.Email);
            return new AuthResponse { IsSuccess = true, Token = token };
        }

        public async Task<AuthResponse> LoginEmployer(EmployerLoginRequest request)
        {
            var hashedPassword = HashPassword(request.Password);
            var employer = await _context.Employers
                .FirstOrDefaultAsync(e => e.Email.Equals(request.Email) && e.HashPassword.Equals(hashedPassword));

            if (employer == null)
                return new AuthResponse { IsSuccess = false, ErrorMessage = "Invalid email or password" };

            var token = GenerateJwtToken(employer.Email);
            return new AuthResponse { IsSuccess = true, Token = token };
        }

        public async Task<AuthResponse> RegisterEmployer(EmployerRegisterRequest request)
        {
            if (await _context.Employers.AnyAsync(e => e.Email == request.Email))
                return new AuthResponse { IsSuccess = false, ErrorMessage = "Email already exists" };

            var employer = new Employer
            {
                Name = request.Name,
                Surname = request.Surname,
                Email = request.Email,
                HashPassword = request.Password,
                CompanyName = request.CompanyName,
            };

            _context.Employers.Add(employer);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(employer.Email);
            return new AuthResponse { IsSuccess = true, Token = token };
        }

        private string GenerateJwtToken(string email)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, email)
                }),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpiryInMinutes"])),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var builder = new StringBuilder();
                for (var i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        private string Encrypt(string input)
        {
            using (var aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(_configuration["EncryptionKey"]);
                aes.IV = Encoding.UTF8.GetBytes(_configuration["EncryptionIV"]);

                using (var encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
                {
                    var inputBytes = Encoding.UTF8.GetBytes(input);
                    var encryptedBytes = encryptor.TransformFinalBlock(inputBytes, 0, inputBytes.Length);
                    return Convert.ToBase64String(encryptedBytes);
                }
            }
        }

        private string Decrypt(string input)
        {
            using (var aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(_configuration["EncryptionKey"]);
                aes.IV = Encoding.UTF8.GetBytes(_configuration["EncryptionIV"]);

                using (var decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
                {
                    var inputBytes = Convert.FromBase64String(input);
                    var decryptedBytes = decryptor.TransformFinalBlock(inputBytes, 0, inputBytes.Length);
                    return Encoding.UTF8.GetString(decryptedBytes);
                }
            }
        }
    }
}
