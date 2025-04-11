using Dapper;
using RMS_Dashboard.Core.Entities;
using RMS_Dashboard.Core.RepositoryContracts;
using RMS_Dashboard.Infrastructure.DbContext;

namespace RMS_Dashboard.Infrastructure.Repositories;

public class EmployeeRepository(DapperDbContext dbContext) : IEmployeeRepository
{
    public async Task<List<Employee>> GetAllEmployees()
    {
        var employeeQuery = "SELECT * FROM employees";
        var employees = await dbContext.DbConnection.QueryAsync<Employee>(employeeQuery);
        return employees.ToList();
    }
}