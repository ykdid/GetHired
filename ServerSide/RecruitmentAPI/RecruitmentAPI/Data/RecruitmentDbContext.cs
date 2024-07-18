using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Models;

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
        public DbSet<AddEmployee> AddEmployees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ApplicationUsers ve JobApplications tabloları userapplication şemasında olacak
            modelBuilder.Entity<ApplicationUser>(entity =>
            {
                entity.ToTable("ApplicationUsers", "userapplication");
                entity.HasKey(au => au.Id);
            });

            modelBuilder.Entity<JobApplication>(entity =>
            {
                entity.ToTable("JobApplications", "userapplication");
                entity.HasKey(ja => ja.Id);
                entity.HasOne(ja => ja.ApplicationUser)
                      .WithMany(u => u.JobApplications)
                      .HasForeignKey(ja => ja.ApplicationUserId);
                entity.HasOne(ja => ja.BackOfficeJobListing)
                      .WithMany(bjl => bjl.JobApplications)
                      .HasForeignKey(ja => ja.BackOfficeJobListingId);
                entity.HasOne(ja => ja.Employer)
                      .WithMany(e => e.JobApplications)
                      .HasForeignKey(ja => ja.EmployerId);
            });

            // Employers, BackOfficeJobListings ve AddEmployees tabloları backoffice şemasında olacak
            modelBuilder.Entity<Employer>(entity =>
            {
                entity.ToTable("Employers", "backoffice");
                entity.HasKey(e => e.Id);
            });

            modelBuilder.Entity<BackOfficeJobListing>(entity =>
            {
                entity.ToTable("BackOfficeJobListings", "backoffice");
                entity.HasKey(bjl => bjl.Id);
            });

            modelBuilder.Entity<AddEmployee>(entity =>
            {
                entity.ToTable("AddEmployees", "backoffice");
                entity.HasKey(ae => ae.Id);
            });
        }
    }
}
