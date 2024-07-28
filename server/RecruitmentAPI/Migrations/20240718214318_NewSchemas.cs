using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RecruitmentAPI.Migrations
{
    /// <inheritdoc />
    public partial class NewSchemas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "backoffice");

            migrationBuilder.EnsureSchema(
                name: "userapplication");

            migrationBuilder.CreateTable(
                name: "AddEmployees",
                schema: "backoffice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    JobType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    EmployerId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddEmployees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Employers",
                schema: "backoffice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Password = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CompanyName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    EmployerImagePath = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationUsers",
                schema: "userapplication",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Age = table.Column<int>(type: "integer", nullable: false),
                    UserProfileImagePath = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CvFilePath = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    RegistrationNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    IdentityNumber = table.Column<string>(type: "character varying(11)", maxLength: 11, nullable: true),
                    EmployerId = table.Column<int>(type: "integer", nullable: true),
                    JobType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApplicationUsers_Employers_EmployerId",
                        column: x => x.EmployerId,
                        principalSchema: "backoffice",
                        principalTable: "Employers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BackOfficeJobListings",
                schema: "backoffice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    OpenDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CloseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ImagePath = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    HtmlContent = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    EmployerId = table.Column<int>(type: "integer", nullable: false),
                    JobType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BackOfficeJobListings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BackOfficeJobListings_Employers_EmployerId",
                        column: x => x.EmployerId,
                        principalSchema: "backoffice",
                        principalTable: "Employers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobApplications",
                schema: "userapplication",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ApplicationUserId = table.Column<int>(type: "integer", nullable: false),
                    BackOfficeJobListingId = table.Column<int>(type: "integer", nullable: false),
                    EmployerId = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobApplications_ApplicationUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalSchema: "userapplication",
                        principalTable: "ApplicationUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobApplications_BackOfficeJobListings_BackOfficeJobListingId",
                        column: x => x.BackOfficeJobListingId,
                        principalSchema: "backoffice",
                        principalTable: "BackOfficeJobListings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobApplications_Employers_EmployerId",
                        column: x => x.EmployerId,
                        principalSchema: "backoffice",
                        principalTable: "Employers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUsers_EmployerId",
                schema: "userapplication",
                table: "ApplicationUsers",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_BackOfficeJobListings_EmployerId",
                schema: "backoffice",
                table: "BackOfficeJobListings",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_ApplicationUserId",
                schema: "userapplication",
                table: "JobApplications",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_BackOfficeJobListingId",
                schema: "userapplication",
                table: "JobApplications",
                column: "BackOfficeJobListingId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_EmployerId",
                schema: "userapplication",
                table: "JobApplications",
                column: "EmployerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AddEmployees",
                schema: "backoffice");

            migrationBuilder.DropTable(
                name: "JobApplications",
                schema: "userapplication");

            migrationBuilder.DropTable(
                name: "ApplicationUsers",
                schema: "userapplication");

            migrationBuilder.DropTable(
                name: "BackOfficeJobListings",
                schema: "backoffice");

            migrationBuilder.DropTable(
                name: "Employers",
                schema: "backoffice");
        }
    }
}
