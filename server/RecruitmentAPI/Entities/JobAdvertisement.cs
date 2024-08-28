using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RecruitmentAPI.Entities
{
    public class JobAdvertisement
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(100)]
        public string? Title { get; set; }

        [MaxLength(10000)]
        public string? Description { get; set; }

        public DateTime InitDate { get; set; }

        public DateTime ExpireDate { get; set; }
        public int EmployerId { get; set; }
        
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TypesOfEmployment EmploymentType { get; set; }
        
    }
    public enum TypesOfEmployment
    {
        FullTime,
        PartTime,
        Intern
    }
}