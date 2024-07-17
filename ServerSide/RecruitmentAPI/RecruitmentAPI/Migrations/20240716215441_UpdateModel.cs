using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecruitmentAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployerId",
                table: "ApplicationUsers",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUsers_EmployerId",
                table: "ApplicationUsers",
                column: "EmployerId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationUsers_Employers_EmployerId",
                table: "ApplicationUsers",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationUsers_Employers_EmployerId",
                table: "ApplicationUsers");

            migrationBuilder.DropIndex(
                name: "IX_ApplicationUsers_EmployerId",
                table: "ApplicationUsers");

            migrationBuilder.DropColumn(
                name: "EmployerId",
                table: "ApplicationUsers");
        }
    }
}
