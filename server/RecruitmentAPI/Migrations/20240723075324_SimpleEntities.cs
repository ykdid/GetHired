using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RecruitmentAPI.Migrations
{
    /// <inheritdoc />
    public partial class SimpleEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Employers_EmployerId",
                schema: "backoffice",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_JobApplications_BackOfficeJobListings_BackOfficeJobListingId",
                schema: "operation",
                table: "JobApplications");

            migrationBuilder.DropForeignKey(
                name: "FK_JobApplications_Employers_EmployerId",
                schema: "operation",
                table: "JobApplications");

            migrationBuilder.DropForeignKey(
                name: "FK_JobApplications_Users_UserId",
                schema: "operation",
                table: "JobApplications");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Employers_EmployerId",
                schema: "userapplication",
                table: "Users");

            migrationBuilder.DropTable(
                name: "BackOfficeJobListings",
                schema: "backoffice");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                schema: "userapplication",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_EmployerId",
                schema: "userapplication",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobApplications",
                schema: "operation",
                table: "JobApplications");

            migrationBuilder.DropIndex(
                name: "IX_JobApplications_BackOfficeJobListingId",
                schema: "operation",
                table: "JobApplications");

            migrationBuilder.DropIndex(
                name: "IX_JobApplications_EmployerId",
                schema: "operation",
                table: "JobApplications");

            migrationBuilder.DropIndex(
                name: "IX_JobApplications_UserId",
                schema: "operation",
                table: "JobApplications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Employers",
                schema: "backoffice",
                table: "Employers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Employees",
                schema: "backoffice",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_EmployerId",
                schema: "backoffice",
                table: "Employees");

            migrationBuilder.RenameTable(
                name: "Users",
                schema: "userapplication",
                newName: "User",
                newSchema: "userapplication");

            migrationBuilder.RenameTable(
                name: "JobApplications",
                schema: "operation",
                newName: "JobApplication",
                newSchema: "operation");

            migrationBuilder.RenameTable(
                name: "Employers",
                schema: "backoffice",
                newName: "Employer",
                newSchema: "backoffice");

            migrationBuilder.RenameTable(
                name: "Employees",
                schema: "backoffice",
                newName: "Employee",
                newSchema: "backoffice");

            migrationBuilder.RenameColumn(
                name: "BackOfficeJobListingId",
                schema: "operation",
                table: "JobApplication",
                newName: "JobAdvertisementId");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                schema: "userapplication",
                table: "User",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "JobType",
                schema: "backoffice",
                table: "Employee",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "EmployerId",
                schema: "backoffice",
                table: "Employee",
                type: "integer",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                schema: "backoffice",
                table: "Employee",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                schema: "userapplication",
                table: "User",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobApplication",
                schema: "operation",
                table: "JobApplication",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employer",
                schema: "backoffice",
                table: "Employer",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employee",
                schema: "backoffice",
                table: "Employee",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "JobAdvertisement",
                schema: "backoffice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    InitDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ExpireDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ImagePath = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    HtmlContent = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    EmployerId = table.Column<int>(type: "integer", nullable: false),
                    JobType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobAdvertisement", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobAdvertisement",
                schema: "backoffice");

            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                schema: "userapplication",
                table: "User");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobApplication",
                schema: "operation",
                table: "JobApplication");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Employer",
                schema: "backoffice",
                table: "Employer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Employee",
                schema: "backoffice",
                table: "Employee");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                schema: "userapplication",
                table: "User");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "backoffice",
                table: "Employee");

            migrationBuilder.RenameTable(
                name: "User",
                schema: "userapplication",
                newName: "Users",
                newSchema: "userapplication");

            migrationBuilder.RenameTable(
                name: "JobApplication",
                schema: "operation",
                newName: "JobApplications",
                newSchema: "operation");

            migrationBuilder.RenameTable(
                name: "Employer",
                schema: "backoffice",
                newName: "Employers",
                newSchema: "backoffice");

            migrationBuilder.RenameTable(
                name: "Employee",
                schema: "backoffice",
                newName: "Employees",
                newSchema: "backoffice");

            migrationBuilder.RenameColumn(
                name: "JobAdvertisementId",
                schema: "operation",
                table: "JobApplications",
                newName: "BackOfficeJobListingId");

            migrationBuilder.AlterColumn<string>(
                name: "JobType",
                schema: "backoffice",
                table: "Employees",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EmployerId",
                schema: "backoffice",
                table: "Employees",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                schema: "userapplication",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobApplications",
                schema: "operation",
                table: "JobApplications",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employers",
                schema: "backoffice",
                table: "Employers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Employees",
                schema: "backoffice",
                table: "Employees",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "BackOfficeJobListings",
                schema: "backoffice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployerId = table.Column<int>(type: "integer", nullable: false),
                    CloseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    HtmlContent = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ImagePath = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    JobType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    OpenDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true)
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

            migrationBuilder.CreateIndex(
                name: "IX_Users_EmployerId",
                schema: "userapplication",
                table: "Users",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_BackOfficeJobListingId",
                schema: "operation",
                table: "JobApplications",
                column: "BackOfficeJobListingId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_EmployerId",
                schema: "operation",
                table: "JobApplications",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_UserId",
                schema: "operation",
                table: "JobApplications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployerId",
                schema: "backoffice",
                table: "Employees",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_BackOfficeJobListings_EmployerId",
                schema: "backoffice",
                table: "BackOfficeJobListings",
                column: "EmployerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Employers_EmployerId",
                schema: "backoffice",
                table: "Employees",
                column: "EmployerId",
                principalSchema: "backoffice",
                principalTable: "Employers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobApplications_BackOfficeJobListings_BackOfficeJobListingId",
                schema: "operation",
                table: "JobApplications",
                column: "BackOfficeJobListingId",
                principalSchema: "backoffice",
                principalTable: "BackOfficeJobListings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobApplications_Employers_EmployerId",
                schema: "operation",
                table: "JobApplications",
                column: "EmployerId",
                principalSchema: "backoffice",
                principalTable: "Employers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobApplications_Users_UserId",
                schema: "operation",
                table: "JobApplications",
                column: "UserId",
                principalSchema: "userapplication",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Employers_EmployerId",
                schema: "userapplication",
                table: "Users",
                column: "EmployerId",
                principalSchema: "backoffice",
                principalTable: "Employers",
                principalColumn: "Id");
        }
    }
}
