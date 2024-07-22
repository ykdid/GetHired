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
        public DbSet<BackOfficeJobListing> BackOfficeJobListings { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.HasDefaultSchema("operation");

            modelBuilder.Entity<Employer>()
                .ToTable("Employers", schema: "backoffice");

            modelBuilder.Entity<BackOfficeJobListing>()
                .ToTable("BackOfficeJobListings", schema: "backoffice");

            modelBuilder.Entity<Employee>()
                .ToTable("Employees", schema: "backoffice");

            modelBuilder.Entity<User>()
                .ToTable("Users", schema: "userapplication");

            modelBuilder.Entity<JobApplication>()
                .ToTable("JobApplications", schema: "operation");

            modelBuilder.Entity<User>()
                .HasKey(au => au.Id);

            modelBuilder.Entity<Employer>()
                .HasKey(e => e.Id);

            modelBuilder.Entity<BackOfficeJobListing>()
                .HasKey(bjl => bjl.Id);

            modelBuilder.Entity<JobApplication>()
                .HasKey(ja => ja.Id);
            
            modelBuilder.Entity<Employee>()
                .HasKey(ae => ae.Id);

            modelBuilder.Entity<JobApplication>()
                .HasOne(ja => ja.User)
                .WithMany(u => u.JobApplications) 
                .HasForeignKey(ja => ja.UserId);

            modelBuilder.Entity<JobApplication>()
                .HasOne(ja => ja.BackOfficeJobListing)
                .WithMany(bjl => bjl.JobApplications) 
                .HasForeignKey(ja => ja.BackOfficeJobListingId);

            modelBuilder.Entity<JobApplication>()
                .HasOne(ja => ja.Employer)
                .WithMany(e => e.JobApplications) 
                .HasForeignKey(ja => ja.EmployerId);
            
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Employer) 
                .WithMany(emp => emp.Employees) 
                .HasForeignKey(e => e.EmployerId);
            
            
        }
    }
}