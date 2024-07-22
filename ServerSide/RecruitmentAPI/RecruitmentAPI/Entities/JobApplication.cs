using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruitmentAPI.Entities
{
    public class JobApplication
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public User? User { get; set; }

        [ForeignKey("BackOfficeJobListing")]
        public int BackOfficeJobListingId { get; set; }

        public BackOfficeJobListing? BackOfficeJobListing { get; set; }

        [ForeignKey("Employer")]
        public int EmployerId { get; set; }

        public Employer? Employer { get; set; }

        public JobApplicationStatus Status { get; set; } = JobApplicationStatus.Pending;
    }

    public enum JobApplicationStatus
    {
        Pending,
        Accepted,
        Rejected
    }
}