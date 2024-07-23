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

        [MaxLength(100)]
        public string? UserProfileImagePath { get; set; }

        [MaxLength(100)]
        public string EncryptedEmail { get; set; }

        [MaxLength(100)]
        public string EncryptedPhoneNumber { get; set; }

        [MaxLength(100)]
        public string? CvFilePath { get; set; }

        [MaxLength(100)]
        public string EncryptedPassword { get; set; }

        [MaxLength(20)]
        public string RegistrationNumber { get; set; } 

        [MaxLength(11)]
        public string IdentityNumber { get; set; } 
        
        public int? EmployeeId { get; set; }
        
        public int? EmployerId { get; set; }
        
        public string? JobType { get; set; }
        
        [NotMapped]
        public string? Email
        {
            get => Decrypt(EncryptedEmail);
            set => EncryptedEmail = Encrypt(value);
        }

        [NotMapped]
        public string? PhoneNumber
        {
            get => Decrypt(EncryptedPhoneNumber);
            set => EncryptedPhoneNumber = Encrypt(value);
        }

        [NotMapped]
        public string? Password
        {
            get => Decrypt(EncryptedPassword);
            set => EncryptedPassword = Encrypt(value);
        }

        private string? Encrypt(string input)
        {
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(input));
        }

        private string? Decrypt(string input)
        {
            return Encoding.UTF8.GetString(Convert.FromBase64String(input));
        }

    }
}
