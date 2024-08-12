using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;
using RecruitmentAPI.Services.EncryptionService;

namespace RecruitmentAPI.Services.UserService;

public class UserService : IUserService
{
    private readonly RecruitmentDbContext _context;
    private readonly IEncryptionService _encryptionService;

    public UserService(RecruitmentDbContext context, IEncryptionService encryptionService)
    {
        _context = context;
        _encryptionService = encryptionService;

    }

    public async Task<bool> CreateUser(User user)
    {
        _context.Users.Add(user);

        var result = await _context.SaveChangesAsync();

        return result > 0;
    }

    public async Task<User> GetUserById(int id)
    {
        var user = await _context.Users.FindAsync(id);
        
        if (user == null)
        {
            throw new KeyNotFoundException($"User with id {id} was not found.");
        }

        user.Email = _encryptionService.Decrypt(user.Email);
        user.PhoneNumber = _encryptionService.Decrypt(user.PhoneNumber);
        
        return user;

    }
    public async Task<User> UpdateUser(int id,User updatedUser)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            throw new KeyNotFoundException($"{updatedUser} was not found.");
        }

        user.Name = updatedUser.Name ?? user.Name;
        user.Surname = updatedUser.Surname ?? user.Surname;
        user.Age = updatedUser.Age;
        user.UserProfileImagePath = updatedUser.UserProfileImagePath ?? user.UserProfileImagePath;
        user.Email = updatedUser.Email ?? user.Email;
        user.PhoneNumber = updatedUser.PhoneNumber ?? user.PhoneNumber;
        user.HashPassword = updatedUser.HashPassword ?? user.HashPassword;
        user.CvFilePath = updatedUser.CvFilePath ?? user.CvFilePath;

        await _context.SaveChangesAsync();

        return user;
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
