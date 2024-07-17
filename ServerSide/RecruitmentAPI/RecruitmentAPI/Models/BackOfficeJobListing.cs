using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruitmentAPI.Models
{
    public class BackOfficeJobListing
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        public string? Title { get; set; }

        [MaxLength(200)]
        public string? Description { get; set; }

        public DateTime OpenDate { get; set; }

        public DateTime CloseDate { get; set; }

        [MaxLength(100)]
        public string? ImagePath { get; set; }

        [MaxLength(100)]
        public string? HtmlContent { get; set; }

        [ForeignKey("Employer")]
        public int EmployerId { get; set; }

        public Employer? Employer { get; set; }

        [MaxLength(100)]
        public string? JobType { get; set; }

        public ICollection<JobApplication>? JobApplications { get; set; }
    }
}