using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Data;
using Microsoft.OpenApi.Models;
using RecruitmentAPI.Services.Abstractions;
using RecruitmentAPI.Services.AuthService;
using RecruitmentAPI.Services.EmployerService;
using RecruitmentAPI.Services.JobAdvertisementService;
using RecruitmentAPI.Services.UserService;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});


builder.Services.AddDbContext<RecruitmentDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddTransient<IAuthService, AuthService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IEmployerService, EmployerService>();
builder.Services.AddTransient<IJobAdvertisementService, JobAdvertisementService>();


builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "RecruitmentAPI", Version = "v1" });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RecruitmentAPI v1"));
}




app.UseHttpsRedirection();

app.UseRouting();


app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();