namespace RecruitmentAPI.DTOs.Models;

public class EmployerRegisterRequest
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string CompanyName { get; set; }
}   