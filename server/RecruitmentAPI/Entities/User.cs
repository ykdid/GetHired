using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace RecruitmentAPI.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
 
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string Surname { get; set; }

        [Range(0, 100)]
        public int Age { get; set; }

        [MaxLength(1000)]
        public string? UserProfileImagePath { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }

        [MaxLength(100)]
        public string PhoneNumber { get; set; }

        [MaxLength(1000)]
        public string? CvFilePath { get; set; }

        [MaxLength(100)]
        public string HashPassword { get; set; }

        [MaxLength(20)]
        public string RegistrationNumber { get; set; } 

        [MaxLength(11)]
        public string IdentityNumber { get; set; } 
        
        public int? EmployeeId { get; set; }
        
        public int? EmployerId { get; set; }
        
        
        
    

      

    }
}
