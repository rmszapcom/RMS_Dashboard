using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace RMS_Dashboard.Data.Migrations
{
    /// <inheritdoc />
    public partial class initialcreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeID = table.Column<string>(type: "text", nullable: false),
                    EmployeeName = table.Column<string>(type: "text", nullable: false),
                    Designation = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    ClientName = table.Column<string>(type: "text", nullable: false),
                    PrimarySkills = table.Column<string>(type: "text", nullable: false),
                    RelevantExpPrimary = table.Column<string>(type: "text", nullable: false),
                    SecondarySkills = table.Column<string>(type: "text", nullable: false),
                    RelevantExpSecondary = table.Column<string>(type: "text", nullable: false),
                    Remarks = table.Column<string>(type: "text", nullable: false),
                    Skill = table.Column<string>(type: "text", nullable: false),
                    ProjectName = table.Column<string>(type: "text", nullable: false),
                    Department = table.Column<string>(type: "text", nullable: true),
                    Location = table.Column<string>(type: "text", nullable: false),
                    WorkLocation = table.Column<string>(type: "text", nullable: false),
                    ReportingManager = table.Column<string>(type: "text", nullable: false),
                    OverAllExperience = table.Column<string>(type: "text", nullable: false),
                    SkillCategory = table.Column<string>(type: "text", nullable: false),
                    Practice = table.Column<string>(type: "text", nullable: false),
                    CareerStartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DateOfJoining = table.Column<string>(type: "text", nullable: false),
                    WorkMode = table.Column<string>(type: "text", nullable: false),
                    BenchStatus = table.Column<string>(type: "text", nullable: false),
                    ExitStatus = table.Column<string>(type: "text", nullable: false),
                    TrainingPlanAssigned = table.Column<string>(type: "text", nullable: false),
                    TrainingCompletionStatus = table.Column<string>(type: "text", nullable: false),
                    PerformanceRating = table.Column<string>(type: "text", nullable: false),
                    ExitDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TotalExpYears = table.Column<decimal>(type: "numeric", nullable: true),
                    BenchStartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    FitmentScore = table.Column<int>(type: "integer", nullable: true),
                    ExpectedRollOffDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Salary = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeID);
                });

            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    ProjectID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProjectName = table.Column<string>(type: "text", nullable: false),
                    ProjectCode = table.Column<string>(type: "text", nullable: false),
                    ClientName = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ProjectStatus = table.Column<string>(type: "text", nullable: false),
                    EngineeringManager = table.Column<string>(type: "text", nullable: false),
                    Architect = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.ProjectID);
                });

            migrationBuilder.CreateTable(
                name: "BenchExitDetail",
                columns: table => new
                {
                    BenchExitID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmpID = table.Column<string>(type: "text", nullable: false),
                    ExitReason = table.Column<string>(type: "text", nullable: false),
                    BenchCategory = table.Column<string>(type: "text", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BenchExitDetail", x => x.BenchExitID);
                    table.ForeignKey(
                        name: "FK_BenchExitDetail_Employees_EmpID",
                        column: x => x.EmpID,
                        principalTable: "Employees",
                        principalColumn: "EmployeeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeSkill",
                columns: table => new
                {
                    SkillID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmpID = table.Column<string>(type: "text", nullable: false),
                    TechStack = table.Column<string>(type: "text", nullable: false),
                    Skill = table.Column<string>(type: "text", nullable: false),
                    SkillDescription = table.Column<string>(type: "text", nullable: false),
                    PastInitiative = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSkill", x => x.SkillID);
                    table.ForeignKey(
                        name: "FK_EmployeeSkill_Employees_EmpID",
                        column: x => x.EmpID,
                        principalTable: "Employees",
                        principalColumn: "EmployeeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeEngagementPlan",
                columns: table => new
                {
                    EngagementID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmpID = table.Column<string>(type: "text", nullable: false),
                    ProjectName = table.Column<string>(type: "text", nullable: false),
                    EngagementPlan = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RollOffDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ProjectID = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeEngagementPlan", x => x.EngagementID);
                    table.ForeignKey(
                        name: "FK_EmployeeEngagementPlan_Employees_EmpID",
                        column: x => x.EmpID,
                        principalTable: "Employees",
                        principalColumn: "EmployeeID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployeeEngagementPlan_Project_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Project",
                        principalColumn: "ProjectID");
                });

            migrationBuilder.CreateTable(
                name: "ResourceAllocations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeName = table.Column<string>(type: "text", nullable: false),
                    ProjectName = table.Column<string>(type: "text", nullable: false),
                    EmployeeID = table.Column<string>(type: "text", nullable: true),
                    ProjectID = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceAllocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResourceAllocations_Employees_EmployeeID",
                        column: x => x.EmployeeID,
                        principalTable: "Employees",
                        principalColumn: "EmployeeID");
                    table.ForeignKey(
                        name: "FK_ResourceAllocations_Project_ProjectID",
                        column: x => x.ProjectID,
                        principalTable: "Project",
                        principalColumn: "ProjectID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BenchExitDetail_EmpID",
                table: "BenchExitDetail",
                column: "EmpID");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEngagementPlan_EmpID",
                table: "EmployeeEngagementPlan",
                column: "EmpID");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEngagementPlan_ProjectID",
                table: "EmployeeEngagementPlan",
                column: "ProjectID");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSkill_EmpID",
                table: "EmployeeSkill",
                column: "EmpID");

            migrationBuilder.CreateIndex(
                name: "IX_ResourceAllocations_EmployeeID",
                table: "ResourceAllocations",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_ResourceAllocations_ProjectID",
                table: "ResourceAllocations",
                column: "ProjectID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BenchExitDetail");

            migrationBuilder.DropTable(
                name: "EmployeeEngagementPlan");

            migrationBuilder.DropTable(
                name: "EmployeeSkill");

            migrationBuilder.DropTable(
                name: "ResourceAllocations");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Project");
        }
    }
}
