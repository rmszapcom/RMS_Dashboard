using RMS_Dashboard.Core.DTOs;
using RMS_Dashboard.Core.Entities;
using RMS_Dashboard.Core.RepositoryContracts;
using RMS_Dashboard.Core.ServiceContracts;
using System;

namespace RMS_Dashboard.Core.Services;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _employeeRepository;

    public EmployeeService(IEmployeeRepository employeeRepository)
    {        
        _employeeRepository = employeeRepository;
    }
    public async Task<List<Employee>> GetEmployeeListAsync()
    {
       return await _employeeRepository.GetAllEmployees();
    }
    public async Task<Employee> GetEmployeeById(string id)
    {
        return await _employeeRepository.GetEmployee(id);
    }

    public async Task<bool> UpdateEmployeeAsync(string id, UpdateEmployeeDto updatedData)
    {
        var employee = await _employeeRepository.GetEmployee(id);
        if (employee == null) return false;

        employee.Designation = updatedData.Designation ?? employee.Designation;
        employee.Status = updatedData.Status ?? employee.Status;
        employee.ClientName = updatedData.ClientName ?? employee.ClientName;
        employee.PrimarySkills = updatedData.PrimarySkills ?? employee.PrimarySkills;
        employee.RelevantExpPrimary = updatedData.RelevantExpPrimary ?? employee.RelevantExpPrimary;
        employee.SecondarySkills = updatedData.SecondarySkills ?? employee.SecondarySkills;
        employee.RelevantExpSecondary = updatedData.RelevantExpSecondary ?? employee.RelevantExpSecondary;
        employee.Remarks = updatedData.Remarks ?? employee.Remarks;
        employee.Skill = updatedData.Skill ?? employee.Skill;
        employee.ProjectName = updatedData.ProjectName ?? employee.ProjectName;
        employee.Department = updatedData.Department ?? employee.Department;
        employee.Location = updatedData.Location ?? employee.Location;
        employee.ReportingManager = updatedData.ReportingManager ?? employee.ReportingManager;
        employee.SkillCategory = updatedData.SkillCategory ?? employee.SkillCategory;
        employee.Practice = updatedData.Practice ?? employee.Practice;
        employee.WorkMode = updatedData.WorkMode ?? employee.WorkMode;
        employee.BenchStatus = updatedData.BenchStatus ?? employee.BenchStatus;
        employee.BenchStartDate = updatedData.BenchStartDate ?? employee.BenchStartDate;
        employee.TrainingPlanAssigned = updatedData.TrainingPlanAssigned ?? employee.TrainingPlanAssigned;
        employee.TrainingCompletionStatus = updatedData.TrainingCompletionStatus ?? employee.TrainingCompletionStatus;
        employee.FitmentScore = updatedData.FitmentScore ?? employee.FitmentScore;
        employee.ExpectedRollOffDate = updatedData.ExpectedRollOffDate ?? employee.ExpectedRollOffDate;
        employee.ExitStatus = updatedData.ExitStatus ?? employee.ExitStatus;
        employee.AvailabilityStatus = updatedData.AvailabilityStatus ?? employee.AvailabilityStatus;

        await _employeeRepository.SaveChangesAsync();
        return true;
    }

}

