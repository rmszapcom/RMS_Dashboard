

using RMS_Dashboard.Core.DTOs;
using RMS_Dashboard.Core.Entities;

namespace RMS_Dashboard.Core.ServiceContracts;

    public interface IEmployeeService
    {
    Task<List<Employee>> GetEmployeeListAsync();
    Task<Employee> GetEmployeeById(string id);
    Task<bool> UpdateEmployeeAsync(string id, UpdateEmployeeDto updatedData);
    }

