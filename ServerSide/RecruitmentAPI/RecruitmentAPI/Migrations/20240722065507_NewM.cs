using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RecruitmentAPI.Migrations
{
    /// <inheritdoc />
    public partial class NewM : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobApplications_ApplicationUsers_ApplicationUserId",
                schema: "userapplication",
                table: "JobApplications");

            migrationBuilder.DropTable(
                name: "AddEmployees",
                schema: "backoffice");

            migrationBuilder.DropTable(
                name: "ApplicationUsers",
                schema: "userapplication");

            migrationBuilder.EnsureSchema(
                name: "operation");

            migrationBuilder.RenameTable(
                name: "JobApplications",
                schema: "userapplication",
                newName: "JobApplications",
                newSchema: "operation");

            migrationBuilder.RenameColumn(
                name: "ApplicationUserId",
                schema: "operation",
                table: "JobApplications",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_JobApplications_ApplicationUserId",
                schema: "operation",
                table: "JobApplications",
                newName: "IX_JobApplications_UserId");

            migrationBuilder.CreateTable(
                name: "Employees",
                schema: "backoffice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    JobType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    EmployerId = table.Column<int>(type: "integer", nullable: false),
                    RegistrationNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    IdentityNumber = table.Column<string>(type: "character varying(11)", maxLength: 11, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_Employers_EmployerId",
                        column: x => x.EmployerId,
                        principalSchema: "backoffice",
                        principalTable: "Employers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "userapplication",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Age = table.Column<int>(type: "integer", nullable: false),
                    UserProfileImagePath = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    EncryptedEmail = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    EncryptedPhoneNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CvFilePath = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    EncryptedPassword = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    RegistrationNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    IdentityNumber = table.Column<string>(type: "character varying(11)", maxLength: 11, nullable: false),
                    EmployerId = table.Column<int>(type: "integer", nullable: true),
                    JobType = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Employers_EmployerId",
                        column: x => x.EmployerId,
                        principalSchema: "backoffice",
                        principalTable: "Employers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployerId",
                schema: "backoffice",
                table: "Employees",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_EmployerId",
                schema: "userapplication",
                table: "Users",
                column: "EmployerId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobApplications_Users_UserId",
                schema: "operation",
                table: "JobApplications",
                column: "UserId",
                principalSchema: "userapplication",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobApplications_Users_UserId",
                schema: "operation",
                table: "JobApplications");

            migrationBuilder.DropTable(
                name: "Employees",
                schema: "backoffice");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "userapplication");

            migrationBuilder.RenameTable(
                name: "JobApplications",
                schema: "operation",
                newName: "JobApplications",
                newSchema: "userapplication");

            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "userapplication",
                table: "JobApplications",
                newName: "ApplicationUserId");

            migrationBuilder.RenameIndex(
                name: "IX_JobApplications_UserId",
                schema: "userapplication",
                table: "JobApplications",
                newName: "IX_JobApplications_ApplicationUserId");

            migrationBuilder.CreateTable(
                name: "AddEmployees",
                schema: "backoffice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployerId = table.Column<int>(type: "integer", nullable: false),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    IdentityNumber = table.Column<string>(type: "character varying(11)", maxLength: 11, nullable: false),
                    JobType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    RegistrationNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddEmployees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AddEmployees_Employers_EmployerId",
                        column: x => x.EmployerId,
                        principalSchema: "backoffice",
                        principalTable: "Employers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationUsers",
                schema: "userapplication",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployerId = table.Column<int>(type: "integer", nullable: true),
                    Age = table.Column<int>(type: "integer", nullable: false),
                    CvFilePath = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    EncryptedEmail = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    EncryptedPassword = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    EncryptedPhoneNumber = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    IdentityNumber = table.Column<string>(type: "character varying(11)", maxLength: 11, nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    RegistrationNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Surname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    UserProfileImagePath = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
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

            migrationBuilder.CreateIndex(
                name: "IX_AddEmployees_EmployerId",
                schema: "backoffice",
                table: "AddEmployees",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUsers_EmployerId",
                schema: "userapplication",
                table: "ApplicationUsers",
                column: "EmployerId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobApplications_ApplicationUsers_ApplicationUserId",
                schema: "userapplication",
                table: "JobApplications",
                column: "ApplicationUserId",
                principalSchema: "userapplication",
                principalTable: "ApplicationUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
