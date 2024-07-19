using System.ComponentModel.DataAnnotations;

namespace RecruitmentAPI.Models;

public class AddEmployee
{
    [Key]
    public int Id { get; set; }
    [MaxLength(100)]
    public string? Name { get; set; }
    [MaxLength(100)]
    public string? Surname { get; set; }
    [MaxLength(100)]
    public string? Email { get; set; }
    [MaxLength(100)]
    public string? JobType { get; set; }
    public int EmployerId { get; set; }
    
}