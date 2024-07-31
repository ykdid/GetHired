using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.UserService;

public interface IUserService
{
    Task<bool> CreateUser(User user);
    Task<User> GetUserById(int id); //email decrypt et 
    Task<User> UpdateUser(int id,User updatedUser);
}