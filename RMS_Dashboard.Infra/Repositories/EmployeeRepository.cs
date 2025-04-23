using Microsoft.EntityFrameworkCore;
using RMS_Dashboard.Core.Entities;
using RMS_Dashboard.Core.RepositoryContracts;
using RMS_Dashboard.Data;

namespace RMS_Dashboard.Infrastructure.Repositories;
public class EmployeeRepository : IEmployeeRepository
{
    private readonly RmsDbContext _context;

    public EmployeeRepository(RmsDbContext context)
    {
        _context = context;
    }

    public async Task<List<Employee>> GetAllEmployees()
    {
        return await _context.Employees.ToListAsync();
    }

    public async Task<Employee> GetEmployee(string employeeId)
    {
        return await _context.Employees
            .FirstOrDefaultAsync(e => e.EmployeeID == employeeId);
    }
}

