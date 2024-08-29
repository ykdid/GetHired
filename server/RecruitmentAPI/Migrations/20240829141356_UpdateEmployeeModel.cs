using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitmentAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateEmployeeModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JobType",
                schema: "backoffice",
                table: "Employee");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                schema: "operation",
                table: "JobApplication",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "EmploymentType",
                schema: "backoffice",
                table: "JobAdvertisement",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "EmploymentType",
                schema: "backoffice",
                table: "Employee",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmploymentType",
                schema: "backoffice",
                table: "Employee");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                schema: "operation",
                table: "JobApplication",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "EmploymentType",
                schema: "backoffice",
                table: "JobAdvertisement",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "JobType",
                schema: "backoffice",
                table: "Employee",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);
        }
    }
}
