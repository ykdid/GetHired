using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecruitmentAPI.Entities
{
    public class JobAdvertisement
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        public string? Title { get; set; }

        [MaxLength(200)]
        public string? Description { get; set; }

        public DateTime InitDate { get; set; }

        public DateTime ExpireDate { get; set; }

        [MaxLength(100)]
        public string? ImagePath { get; set; }

        [MaxLength(100)]
        public string? HtmlContent { get; set; }
        
        public int EmployerId { get; set; }

        [MaxLength(100)]
        public string JobType { get; set; }
        
    }
}