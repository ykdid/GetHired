using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitmentAPI.Migrations
{
    /// <inheritdoc />
    public partial class EditedEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JobType",
                schema: "user",
                table: "User");

            migrationBuilder.DropColumn(
                name: "HtmlContent",
                schema: "backoffice",
                table: "JobAdvertisement");

            migrationBuilder.DropColumn(
                name: "ImagePath",
                schema: "backoffice",
                table: "JobAdvertisement");

            migrationBuilder.DropColumn(
                name: "JobType",
                schema: "backoffice",
                table: "JobAdvertisement");

            migrationBuilder.AlterColumn<string>(
                name: "UserProfileImagePath",
                schema: "user",
                table: "User",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CvFilePath",
                schema: "user",
                table: "User",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                schema: "operation",
                table: "JobApplication",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                schema: "backoffice",
                table: "JobAdvertisement",
                type: "TEXT",
                maxLength: 10000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EmploymentType",
                schema: "backoffice",
                table: "JobAdvertisement",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "EmployerImagePath",
                schema: "backoffice",
                table: "Employer",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CompanyName",
                schema: "backoffice",
                table: "Employer",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CompanyImagePath",
                schema: "backoffice",
                table: "Employer",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmploymentType",
                schema: "backoffice",
                table: "JobAdvertisement");

            migrationBuilder.DropColumn(
                name: "CompanyImagePath",
                schema: "backoffice",
                table: "Employer");

            migrationBuilder.AlterColumn<string>(
                name: "UserProfileImagePath",
                schema: "user",
                table: "User",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CvFilePath",
                schema: "user",
                table: "User",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "JobType",
                schema: "user",
                table: "User",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                schema: "operation",
                table: "JobApplication",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                schema: "backoffice",
                table: "JobAdvertisement",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 10000,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HtmlContent",
                schema: "backoffice",
                table: "JobAdvertisement",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                schema: "backoffice",
                table: "JobAdvertisement",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "JobType",
                schema: "backoffice",
                table: "JobAdvertisement",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "EmployerImagePath",
                schema: "backoffice",
                table: "Employer",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(1000)",
                oldMaxLength: 1000,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CompanyName",
                schema: "backoffice",
                table: "Employer",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);
        }
    }
}
