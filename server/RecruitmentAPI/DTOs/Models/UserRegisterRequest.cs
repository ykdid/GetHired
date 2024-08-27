    namespace RecruitmentAPI.DTOs.Models;

    public class UserRegisterRequest
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Age { get; set; }
        public string PhoneNumber { get; set; }
        public string RegistrationNumber { get; set; }  
        public string IdentityNumber { get; set; }
    }