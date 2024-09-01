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
        user.CvFilePath = updatedUser.CvFilePath ?? user.CvFilePath;
        
        if (!string.IsNullOrEmpty(updatedUser.Email))
        {
            user.Email = _encryptionService.Encrypt((updatedUser.Email));
        }
        if (!string.IsNullOrEmpty(updatedUser.PhoneNumber))
        {
            user.PhoneNumber = _encryptionService.Encrypt((updatedUser.PhoneNumber));
        }

        await _context.SaveChangesAsync();

        return user;
    }
    
    public async Task<bool> UpdatePassword(int id, string currentPassword, string newPassword)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            throw new KeyNotFoundException($"User with id {id} doesn't found");
        }
        
        if (!_encryptionService.VerifyHash(currentPassword, user.HashPassword))
        {
            throw new UnauthorizedAccessException("Current password is incorrect.");
        }
        
        user.HashPassword = _encryptionService.Hash(newPassword);

        await _context.SaveChangesAsync();
        
        return true;

    }
}
