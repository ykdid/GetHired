using RecruitmentAPI.Enums;

namespace RecruitmentAPI.DTOs.Models;

public class UpdateJobApplicationStatusRequest
{
    public JobApplicationStatus Status { get; set; }
}