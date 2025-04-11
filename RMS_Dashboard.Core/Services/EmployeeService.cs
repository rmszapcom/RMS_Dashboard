using RMS_Dashboard.Core.Entities;
using RMS_Dashboard.Core.RepositoryContracts;
using RMS_Dashboard.Core.ServiceContracts;


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
}

