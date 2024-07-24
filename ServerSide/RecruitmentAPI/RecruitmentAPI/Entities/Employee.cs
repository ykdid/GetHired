using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruitmentAPI.Entities;

public class Employee
{
    [Key]
    public int Id { get; set; }
    [MaxLength(100)]
    public string Name { get; set; }
    [MaxLength(100)]
    public string Surname { get; set; }
    [MaxLength(100)]
    public string Email { get; set; }
    [MaxLength(100)]
    public int? EmployerId { get; set; }
    public int? UserId { get; set; }
    public string? JobType { get; set; }
    [MaxLength(20)]
    public string RegistrationNumber { get; set; } 
    [MaxLength(11)]
    public string IdentityNumber { get; set; } 
    
}