using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using RecruitmentAPI.Entities;

namespace RecruitmentAPI.Entities
{
    public class Employer
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string Surname { get; set; }

        [MaxLength(100)]
        //[EmailAddress]
        public string Email { get; set; }

        [MaxLength(100)]
        public string Password { get; set; }

        [MaxLength(100)]
        public string? CompanyName { get; set; }

        [MaxLength(100)]
        public string? EmployerImagePath { get; set; }
        
        public ICollection<BackOfficeJobListing>? Advertisements { get; set; }
        public ICollection<JobApplication>? JobApplications { get; set; }
        
        public ICollection<ApplicationUser>? UserEmployees { get; set; }
        public ICollection<AddEmployee>? Employees { get; set; }
    }
}