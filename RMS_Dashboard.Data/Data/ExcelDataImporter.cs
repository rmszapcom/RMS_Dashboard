using OfficeOpenXml;
using RMS_Dashboard.Core.Entities;
using Microsoft.Extensions.Logging;

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
            ExcelPackage.License.SetNonCommercialPersonal("Soumya");

            try
            {
                using var package = new ExcelPackage(new FileInfo(filePath));
                var worksheet = package.Workbook.Worksheets[0];
                var rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    var employeeId = worksheet.Cells[row, 1].Text;
                    var employeeName = worksheet.Cells[row, 2].Text;
                    var doj = worksheet.Cells[row, 3].Text;
                    var reportingManager = worksheet.Cells[row, 4].Text;
                    var designation = worksheet.Cells[row, 5].Text;
                    var status = worksheet.Cells[row, 6].Text;
                    var clientName = worksheet.Cells[row, 7].Text;
                    var benchStatus = worksheet.Cells[row, 10].Text;
                    var projectName = worksheet.Cells[row, 14].Text;
                    var workLocation = worksheet.Cells[row, 15].Text;
                    var careerDate = worksheet.Cells[row, 16].Text;
                    var overAllExp = worksheet.Cells[row, 17].Text;
                    var pSkills = worksheet.Cells[row, 18].Text;
                    var relevantpriExp = worksheet.Cells[row, 19].Text;
                    var sSkills = worksheet.Cells[row, 20].Text;
                    var relevantSecExp = worksheet.Cells[row, 21].Text;
                    var skillCategory = worksheet.Cells[row, 22].Text;
                    var isAllocated = worksheet.Cells[row, 26].Text;
                    var isEngaged = worksheet.Cells[row, 27].Text;

                    DateTime? parsedCareerDate = null;
                    if (DateTime.TryParse(careerDate, out var tempCareerDate))
                    {
                        parsedCareerDate = DateTime.SpecifyKind(tempCareerDate, DateTimeKind.Utc);
                    }


                    string practice = worksheet.Cells[row, 23].Text;
                    if (string.IsNullOrWhiteSpace(practice))
                    {
                        _logger.LogWarning($"Practice is missing for row {row}, assigning default value 'Unknown'.");
                        practice = "Unknown"; 
                    }
                    string workMode = worksheet.Cells[row, 12].Text;
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
                        IsEngaged = isEngaged,
                        IsAllocated = isAllocated,
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