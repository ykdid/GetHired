namespace RecruitmentAPI.Models.Response;

public abstract class BaseResponse
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; }
}