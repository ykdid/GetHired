using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.UserService;

public interface IUserService
{
    Task<bool> CreateUser(User user);
    Task<User> GetUserById(int id); 
    Task<User> UpdateUser(int id,User updatedUser);
    Task<bool> UpdatePassword(int id, string currentPassword, string newPassword);
}