using Microsoft.AspNetCore.Http.HttpResults;
using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.UserService;

public class UserService : IUserService
{
    private readonly RecruitmentDbContext _context;

    public UserService(RecruitmentDbContext context)
    {
        _context = context;
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
        user.Password = updatedUser.Password ?? user.Password;
        user.CvFilePath = updatedUser.CvFilePath ?? user.CvFilePath;

        await _context.SaveChangesAsync();

        return user;
    }
    
   

   
}
