using RecruitmentAPI.Data;
using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Services.UserServices;

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
}
