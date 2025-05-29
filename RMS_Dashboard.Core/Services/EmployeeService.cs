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
        employee.ProjectName = updatedData.ProjectName ?? employee.ProjectName;
        employee.ReportingManager = updatedData.ReportingManager ?? employee.ReportingManager;
        employee.SkillCategory = updatedData.SkillCategory ?? employee.SkillCategory;
        employee.Practice = updatedData.Practice ?? employee.Practice;
        employee.WorkMode = updatedData.WorkMode ?? employee.WorkMode;
        employee.WorkLocation = updatedData.WorkLocation ?? employee.WorkLocation;
        employee.BenchStatus = updatedData.BenchStatus ?? employee.BenchStatus;
        employee.BenchStartDate = updatedData.BenchStartDate ?? employee.BenchStartDate;
        employee.ReportingManager = updatedData.ReportingManager ?? employee.ReportingManager;
        employee.OverAllExperience = updatedData.OverAllExperience ?? employee.OverAllExperience;
        employee.Practice = updatedData.Practice ?? employee.Practice;
        employee.IsAllocated = updatedData.IsAllocated ?? employee.IsAllocated;
        employee.IsEngaged = updatedData.IsEngaged ?? employee.IsEngaged;
        employee.ExpectedRollOffDate = updatedData.ExpectedRollOffDate ?? employee.ExpectedRollOffDate;
       
        await _employeeRepository.SaveChangesAsync();
        return true;
    }

}

