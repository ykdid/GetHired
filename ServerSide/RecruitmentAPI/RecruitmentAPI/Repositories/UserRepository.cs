using RecruitmentAPI.Data;
using RecruitmentAPI.Models;
using RecruitmentAPI.Repositories.Abstractions;

namespace RecruitmentAPI.Repositories;

public class UserRepository: IUserRepository
{
    private readonly RecruitmentDbContext _context;

    public UserRepository(RecruitmentDbContext context)
    {
        _context = context;
    }

    public async Task<UserModel> GetUserByEmailAsync(string email)
    {
        await _context.ApplicationUsers.FindAsync();
        return new UserModel();
    }
}