using RMS_Dashboard.Core.Entities;
using Microsoft.Extensions.Logging;
using ClosedXML.Excel;

namespace RMS_Dashboard.Data
{
    public class ExcelDataImporter
    {
        private readonly RmsDbContext _context;
        private readonly ILogger<ExcelDataImporter> _logger;

        public ExcelDataImporter(RmsDbContext context, ILogger<ExcelDataImporter> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task ImportEmployeesAsync(string filePath)
        {
            try
            {
                using var workbook = new XLWorkbook(filePath);
                var worksheet = workbook.Worksheet(1); // or by name: workbook.Worksheet("Sheet1")

                var firstRowUsed = worksheet.FirstRowUsed().RowNumber();
                var lastRowUsed = worksheet.LastRowUsed().RowNumber();

                for (int row = firstRowUsed + 1; row <= lastRowUsed; row++)
                {
                    var employeeId = worksheet.Cell(row, 1).GetValue<string>();
                    var employeeName = worksheet.Cell(row, 2).GetValue<string>();
                    var doj = worksheet.Cell(row, 3).GetValue<string>();
                    var reportingManager = worksheet.Cell(row, 4).GetValue<string>();
                    var designation = worksheet.Cell(row, 5).GetValue<string>();
                    var status = worksheet.Cell(row, 6).GetValue<string>();
                    var clientName = worksheet.Cell(row, 7).GetValue<string>();
                    var remarks = worksheet.Cell(row, 8).GetValue<string>();
                    var benchStatus = worksheet.Cell(row, 10).GetValue<string>();
                    var projectName = worksheet.Cell(row, 14).GetValue<string>();
                    var workLocation = worksheet.Cell(row, 15).GetValue<string>();
                    var careerDate = worksheet.Cell(row, 16).GetValue<string>();
                    var overAllExp = worksheet.Cell(row, 17).GetValue<string>();
                    var pSkills = worksheet.Cell(row, 18).GetValue<string>();
                    var relevantpriExp = worksheet.Cell(row, 19).GetValue<string>();
                    var sSkills = worksheet.Cell(row, 20).GetValue<string>();
                    var relevantSecExp = worksheet.Cell(row, 21).GetValue<string>();
                    var skillCategory = worksheet.Cell(row, 22).GetValue<string>();
                    var seniority = worksheet.Cell(row, 26).GetValue<string>();
                    var expAtZapCom = worksheet.Cell(row, 27).GetValue<string>();
                    var isAllocated = worksheet.Cell(row, 28).GetValue<string>();
                    var isEngaged = worksheet.Cell(row, 29).GetValue<string>();
                    var benchStartDate = worksheet.Cell(row, 10).GetValue<string>();

                    DateTime? parsedCareerDate = null;
                    if (DateTime.TryParse(careerDate, out var tempCareerDate))
                    {
                        parsedCareerDate = DateTime.SpecifyKind(tempCareerDate, DateTimeKind.Utc);
                    }

                    string practice = worksheet.Cell(row, 23).GetValue<string>();
                    if (string.IsNullOrWhiteSpace(practice))
                    {
                        _logger.LogWarning($"Practice is missing for row {row}, assigning default value 'Unknown'.");
                        practice = "Unknown";
                    }

                    string workMode = worksheet.Cell(row, 12).GetValue<string>();
                    if (string.IsNullOrWhiteSpace(workMode))
                    {
                        _logger.LogWarning($"WorkMode is missing for row {row}, assigning default value 'Unknown'.");
                        workMode = "Unknown";
                    }

                    var employee = new Employee
                    {
                        EmployeeID = employeeId,
                        EmployeeName = employeeName,
                        DateOfJoining = doj,
                        ReportingManager = reportingManager,
                        Designation = designation,
                        Status = status,
                        ClientName = clientName,
                        BenchStatus = benchStatus,
                        WorkLocation = workLocation,
                        ProjectName = projectName,
                        CareerStartDate = parsedCareerDate,
                        OverAllExperience = overAllExp,
                        PrimarySkills = pSkills,
                        RelevantExpPrimary = relevantpriExp,
                        SecondarySkills = sSkills,
                        RelevantExpSecondary = relevantSecExp,
                        SkillCategory = skillCategory,
                        Practice = practice,
                        WorkMode = workMode,
                        Seniority = seniority,
                        ExperienceAtZapCom = expAtZapCom,
                        BenchStartDate = benchStartDate,
                        Remarks = remarks,
                        // Optionally include isAllocated, isEngaged if part of Employee entity
                    };

                    var existing = await _context.Employees.FindAsync(employee.EmployeeID);
                    if (existing != null)
                    {
                        _context.Entry(existing).CurrentValues.SetValues(employee);
                    }
                    else
                    {
                        await _context.Employees.AddAsync(employee);
                    }
                }

                await _context.SaveChangesAsync();
                _logger.LogInformation("Employee data import completed successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while importing employee data.");
                throw;
            }
        }
    }
}
