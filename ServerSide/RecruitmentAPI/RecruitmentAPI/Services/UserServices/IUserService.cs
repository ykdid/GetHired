using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.UserServices;

public interface IUserService
{
    Task<bool> CreateUser(User user);
    Task<User> GetUserById(int id);
    Task<User> UpdateUser(User updatedUser);
}