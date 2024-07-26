using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitmentAPI.Migrations
{
    /// <inheritdoc />
    public partial class NewUpdatedUserModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EncryptedPhoneNumber",
                schema: "user",
                table: "User",
                newName: "PhoneNumber");

            migrationBuilder.RenameColumn(
                name: "EncryptedPassword",
                schema: "user",
                table: "User",
                newName: "HashPassword");

            migrationBuilder.RenameColumn(
                name: "EncryptedEmail",
                schema: "user",
                table: "User",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "Password",
                schema: "backoffice",
                table: "Employer",
                newName: "HashPassword");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                schema: "user",
                table: "User",
                newName: "EncryptedPhoneNumber");

            migrationBuilder.RenameColumn(
                name: "HashPassword",
                schema: "user",
                table: "User",
                newName: "EncryptedPassword");

            migrationBuilder.RenameColumn(
                name: "Email",
                schema: "user",
                table: "User",
                newName: "EncryptedEmail");

            migrationBuilder.RenameColumn(
                name: "HashPassword",
                schema: "backoffice",
                table: "Employer",
                newName: "Password");
        }
    }
}
