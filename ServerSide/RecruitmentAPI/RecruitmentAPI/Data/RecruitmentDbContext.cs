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

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<BackOfficeJobListing> BackOfficeJobListings { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }
        public DbSet<AddEmployee>  AddEmployees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.HasDefaultSchema("public");

            modelBuilder.Entity<Employer>()
                .ToTable("Employers", schema: "backoffice");

            modelBuilder.Entity<BackOfficeJobListing>()
                .ToTable("BackOfficeJobListings", schema: "backoffice");

            modelBuilder.Entity<AddEmployee>()
                .ToTable("AddEmployees", schema: "backoffice");

            modelBuilder.Entity<ApplicationUser>()
                .ToTable("ApplicationUsers", schema: "userapplication");

            modelBuilder.Entity<JobApplication>()
                .ToTable("JobApplications", schema: "userapplication");

            modelBuilder.Entity<ApplicationUser>()
                .HasKey(au => au.Id);

            modelBuilder.Entity<Employer>()
                .HasKey(e => e.Id);

            modelBuilder.Entity<BackOfficeJobListing>()
                .HasKey(bjl => bjl.Id);

            modelBuilder.Entity<JobApplication>()
                .HasKey(ja => ja.Id);
            
            modelBuilder.Entity<AddEmployee>()
                .HasKey(ae => ae.Id);

            modelBuilder.Entity<JobApplication>()
                .HasOne(ja => ja.ApplicationUser)
                .WithMany(u => u.JobApplications) 
                .HasForeignKey(ja => ja.ApplicationUserId);

            modelBuilder.Entity<JobApplication>()
                .HasOne(ja => ja.BackOfficeJobListing)
                .WithMany(bjl => bjl.JobApplications) 
                .HasForeignKey(ja => ja.BackOfficeJobListingId);

            modelBuilder.Entity<JobApplication>()
                .HasOne(ja => ja.Employer)
                .WithMany(e => e.JobApplications) 
                .HasForeignKey(ja => ja.EmployerId);
            
            modelBuilder.Entity<AddEmployee>()
                .HasOne(e => e.Employer) 
                .WithMany(emp => emp.Employees) 
                .HasForeignKey(e => e.EmployerId);
            
            
        }
    }
}