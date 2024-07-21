namespace RecruitmentAPI.Models.Response;

public class LoginResponse : BaseResponse
{
    public string Email { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Token { get; set; }
}