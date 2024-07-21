using RecruitmentAPI.Models;

namespace RecruitmentAPI.Repositories.Abstractions;

public interface IUserRepository
{
    Task<UserModel> GetUserByEmailAsync(string email);
}