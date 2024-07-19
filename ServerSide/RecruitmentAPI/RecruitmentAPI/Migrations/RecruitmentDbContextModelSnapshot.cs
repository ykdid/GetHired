﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using RecruitmentAPI.Data;

#nullable disable

namespace RecruitmentAPI.Migrations
{
    [DbContext(typeof(RecruitmentDbContext))]
    partial class RecruitmentDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("public")
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("RecruitmentAPI.Models.AddEmployee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<int>("EmployerId")
                        .HasColumnType("integer");

                    b.Property<string>("JobType")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Surname")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("Id");

                    b.ToTable("AddEmployees", "backoffice");
                });

            modelBuilder.Entity("RecruitmentAPI.Models.ApplicationUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Age")
                        .HasColumnType("integer");

                    b.Property<string>("CvFilePath")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<int?>("EmployerId")
                        .HasColumnType("integer");

                    b.Property<string>("IdentityNumber")
                        .HasMaxLength(11)
                        .HasColumnType("character varying(11)");

                    b.Property<string>("JobType")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("RegistrationNumber")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Surname")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("UserProfileImagePath")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("Id");

                    b.HasIndex("EmployerId");

                    b.ToTable("ApplicationUsers", "userapplication");
                });

            modelBuilder.Entity("RecruitmentAPI.Models.BackOfficeJobListing", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CloseDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<int>("EmployerId")
                        .HasColumnType("integer");

                    b.Property<string>("HtmlContent")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("ImagePath")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("JobType")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<DateTime>("OpenDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Title")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("Id");

                    b.HasIndex("EmployerId");

                    b.ToTable("BackOfficeJobListings", "backoffice");
                });

            modelBuilder.Entity("RecruitmentAPI.Models.Employer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("CompanyName")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Email")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("EmployerImagePath")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Name")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Password")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Surname")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.HasKey("Id");

                    b.ToTable("Employers", "backoffice");
                });

            modelBuilder.Entity("RecruitmentAPI.Models.JobApplication", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("ApplicationUserId")
                        .HasColumnType("integer");

                    b.Property<int>("BackOfficeJobListingId")
                        .HasColumnType("integer");

                    b.Property<int>("EmployerId")
                        .HasColumnType("integer");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("BackOfficeJobListingId");

                    b.HasIndex("EmployerId");

                    b.ToTable("JobApplications", "userapplication");
                });

            modelBuilder.Entity("RecruitmentAPI.Models.ApplicationUser", b =>
                {
                    b.HasOne("RecruitmentAPI.Models.Employer", "Employer")
                        .WithMany("Employees")
                        .HasForeignKey("EmployerId");

                    b.Navigation("Employer");
                });

            modelBuilder.Entity("RecruitmentAPI.Models.BackOfficeJobListing", b =>
                {
                    b.HasOne("RecruitmentAPI.Models.Employer", "Employer")
                        .WithMany("Advertisements")
                        .HasForeignKey("EmployerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employer");
                });

            modelBuilder.Entity("RecruitmentAPI.Models.JobApplication", b =>
                {
                    b.HasOne("RecruitmentAPI.Models.ApplicationUser", "ApplicationUser")
                        .WithMany("JobApplications")
                        .HasForeignKey("ApplicationUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RecruitmentAPI.Models.BackOfficeJobListing", "BackOfficeJobListing")
                        .WithMany("JobApplications")
                        .HasForeignKey("BackOfficeJobListingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RecruitmentAPI.Models.Employer", "Employer")
                        .WithMany("JobApplications")
                        .HasForeignKey("EmployerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ApplicationUser");

                    b.Navigation("BackOfficeJobListing");

                    b.Navigation("Employer");
                });

            modelBuilder.Entity("RecruitmentAPI.Models.ApplicationUser", b =>
                {
                    b.Navigation("JobApplications");
                });

            modelBuilder.Entity("RecruitmentAPI.Models.BackOfficeJobListing", b =>
                {
                    b.Navigation("JobApplications");
                });

            modelBuilder.Entity("RecruitmentAPI.Models.Employer", b =>
                {
                    b.Navigation("Advertisements");

                    b.Navigation("Employees");

                    b.Navigation("JobApplications");
                });
#pragma warning restore 612, 618
        }
    }
}
