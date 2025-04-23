using OfficeOpenXml;
using RMS_Dashboard.Core.Entities;
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

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
                    var remarks = worksheet.Cells[row, 8].Text;
                    var skills = worksheet.Cells[row, 9].Text;
                    var benchStatus = worksheet.Cells[row, 10].Text;
                    var exitStatus = worksheet.Cells[row, 11].Text;
                    var workLocation = worksheet.Cells[row, 12].Text;
                    var projectName = worksheet.Cells[row, 14].Text;
                    var location = worksheet.Cells[row, 15].Text;
                    var careerDate = worksheet.Cells[row, 16].Text;
                    DateTime? parsedCareerDate = null;
                    if (DateTime.TryParse(careerDate, out var tempCareerDate))
                    {
                        parsedCareerDate = DateTime.SpecifyKind(tempCareerDate, DateTimeKind.Utc);
                    }

                    var overAllExp = worksheet.Cells[row, 17].Text;
                    var pSkills = worksheet.Cells[row, 18].Text;
                    var relevantpriExp = worksheet.Cells[row, 19].Text;
                    var sSkills = worksheet.Cells[row, 20].Text;
                    var relevantSecExp = worksheet.Cells[row, 21].Text;
                    var skillCategory = worksheet.Cells[row, 22].Text;

                    string department = worksheet.Cells[row, 23].Text; 
                    if (string.IsNullOrWhiteSpace(department))
                    {
                        _logger.LogWarning($"Department is missing for row {row}, assigning default value 'Unknown'.");
                        department = "Unknown";
                    }
                    string practice = worksheet.Cells[row, 24].Text;
                    if (string.IsNullOrWhiteSpace(practice))
                    {
                        _logger.LogWarning($"Practice is missing for row {row}, assigning default value 'Unknown'.");
                        practice = "Unknown"; 
                    }
                    string workMode = worksheet.Cells[row, 25].Text;
                    if (string.IsNullOrWhiteSpace(workMode))
                    {
                        _logger.LogWarning($"WorkMode is missing for row {row}, assigning default value 'Unknown'.");
                        workMode = "Unknown"; 
                    }
                    string trainingPlanAssigned = worksheet.Cells[row, 26].Text;
                    if (string.IsNullOrWhiteSpace(trainingPlanAssigned))
                    {
                        _logger.LogWarning($"TrainingPlanAssigned is missing for row {row}, assigning default value 'Not Assigned'.");
                        trainingPlanAssigned = "Not Assigned"; 
                    }
                    string trainingCompletionStatus = worksheet.Cells[row, 27].Text; 
                    if (string.IsNullOrWhiteSpace(trainingCompletionStatus))
                    {
                        _logger.LogWarning($"TrainingCompletionStatus is missing for row {row}, assigning default value 'Not Completed'.");
                        trainingCompletionStatus = "Not Completed";
                    }
                    string performanceRating = worksheet.Cells[row, 28].Text; 
                    if (string.IsNullOrWhiteSpace(performanceRating))
                    {
                        _logger.LogWarning($"PerformanceRating is missing for row {row}, assigning default value 'Not Rated'.");
                        performanceRating = "Not Rated";
                    }
                    string salary = worksheet.Cells[row, 29].Text; 
                    if (string.IsNullOrWhiteSpace(salary))
                    {
                        _logger.LogWarning($"Salary is missing for row {row}, assigning default value '0'.");
                        salary = "0"; 
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
                        Remarks = remarks,
                        Skill = skills,
                        BenchStatus = benchStatus,
                        ExitStatus = exitStatus,
                        WorkLocation = workLocation,
                        ProjectName = projectName,
                        Location = location,
                        CareerStartDate = parsedCareerDate,
                        OverAllExperience = overAllExp,
                        PrimarySkills = pSkills,
                        RelevantExpPrimary = relevantpriExp,
                        SecondarySkills = sSkills,
                        RelevantExpSecondary = relevantSecExp,
                        SkillCategory = skillCategory,
                        Department = department,
                        Practice = practice,
                        WorkMode = workMode,
                        TrainingPlanAssigned = trainingPlanAssigned,
                        TrainingCompletionStatus = trainingCompletionStatus,
                        PerformanceRating= performanceRating,
                        Salary= salary,

                    };

                    var exists = await _context.Employees.AnyAsync(e => e.EmployeeID == employee.EmployeeID);
                    if (!exists)
                    {
                        _context.Employees.Add(employee);
                    }
                    else
                    {
                        _logger.LogWarning($"Skipped duplicate EmployeeID '{employeeId}' at row {row}.");
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