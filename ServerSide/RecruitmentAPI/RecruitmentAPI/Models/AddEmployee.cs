namespace RecruitmentAPI.Models;

public class AddEmployee
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string JobType { get; set; }
    public int EmployerId { get; set; }
    
}