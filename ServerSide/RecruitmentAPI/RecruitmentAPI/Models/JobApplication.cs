using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruitmentAPI.Models
{
    public class JobApplication
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("ApplicationUser")]
        public int ApplicationUserId { get; set; }

        public ApplicationUser? ApplicationUser { get; set; }

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