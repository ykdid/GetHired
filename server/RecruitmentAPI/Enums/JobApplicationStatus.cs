using System.Text.Json.Serialization;

namespace RecruitmentAPI.Enums;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum JobApplicationStatus
{
    Pending,
    Accepted,
    Rejected
}