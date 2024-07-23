using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.UserServices;

public interface IUserService
{
    Task<User> CreateUser(User user);
}