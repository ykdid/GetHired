using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Entities;


namespace RecruitmentAPI.Data
{
    public class RecruitmentDbContext : DbContext
    {
        public RecruitmentDbContext(DbContextOptions<RecruitmentDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<JobAdvertisement> JobAdvertisements { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.HasDefaultSchema("operation");

            modelBuilder.Entity<Employer>()
                .ToTable("Employer", schema: "backoffice");

            modelBuilder.Entity<JobAdvertisement>()
                .ToTable("JobAdvertisement", schema: "backoffice");

            modelBuilder.Entity<Employee>()
                .ToTable("Employee", schema: "backoffice");

            modelBuilder.Entity<User>()
                .ToTable("User", schema: "user");

            modelBuilder.Entity<JobApplication>()
                .ToTable("JobApplication", schema: "operation");

            modelBuilder.Entity<User>()
                .HasKey(au => au.Id);

            modelBuilder.Entity<Employer>()
                .HasKey(e => e.Id);

            modelBuilder.Entity<JobAdvertisement>()
                .HasKey(ja => ja.Id);

            modelBuilder.Entity<JobApplication>()
                .HasKey(jap => jap.Id);
            
            modelBuilder.Entity<Employee>()
                .HasKey(ae => ae.Id);
            
        }
    }
}