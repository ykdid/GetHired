namespace RecruitmentAPI.DTOs.Models;

public class AuthResponse
{
    public bool IsSuccess { get; set; }
    public string Token { get; set; }
    public string ErrorMessage { get; set; }
    public int? EmployerId { get; set; } 
    public int? UserId { get; set; }
}