using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitmentAPI.Migrations
{
    /// <inheritdoc />
    public partial class NewUserSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "user");

            migrationBuilder.RenameTable(
                name: "User",
                schema: "userapplication",
                newName: "User",
                newSchema: "user");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "userapplication");

            migrationBuilder.RenameTable(
                name: "User",
                schema: "user",
                newName: "User",
                newSchema: "userapplication");
        }
    }
}
