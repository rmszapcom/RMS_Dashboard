
using RMS_Dashboard.Core.Entities;
using RMS_Dashboard.Core.RepositoryContracts;

namespace RMS_Dashboard.Infrastructure.Repositories;
public class EmployeeRepository : IEmployeeRepository
{
    public async Task<List<Employee>> GetAllEmployees()
    {
        var employeeList = new List<Employee>
        {
            new Employee
            {
                EmployeeID = "Zc001",
                EmployeeName = "Rahul Mekala"
                // Add other properties if needed
            }
        };

        return await Task.FromResult(employeeList);
    }
}

