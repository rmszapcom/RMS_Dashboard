
using RMS_Dashboard.Core.Entities;
using RMS_Dashboard.Core.RepositoryContracts;

namespace RMS_Dashboard.Infrastructure.Repositories;
public class EmployeeRepository : IEmployeeRepository
{
    private readonly List<Employee> _employeeList = new List<Employee>
    {
        new Employee
        {
            EmployeeID = "Zc001",
            EmployeeName = "Rahul Mekala"
            // Add other properties if needed
        }
    };
    public async Task<List<Employee>> GetAllEmployees()
    {
        return await Task.FromResult(_employeeList);
    }

    public async Task<Employee> GetEmployee(string employeeId)
    {
        var employee = _employeeList.FirstOrDefault(e => e.EmployeeID == employeeId);
        return await Task.FromResult(employee);
    }
}

