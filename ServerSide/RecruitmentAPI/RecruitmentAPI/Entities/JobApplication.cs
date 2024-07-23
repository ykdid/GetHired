using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruitmentAPI.Entities
{
    public class JobApplication
    {
        [Key]
        public int Id { get; set; }
        
        public int UserId { get; set; }
        public int JobAdvertisementId { get; set; }
        public int EmployerId { get; set; }
        public JobApplicationStatus Status { get; set; } = JobApplicationStatus.Pending;
    }

    public enum JobApplicationStatus
    {
        Pending,
        Accepted,
        Rejected
    }
}