

using RMS_Dashboard.Core.Entities;

namespace RMS_Dashboard.Core.ServiceContracts;

    public interface IEmployeeService
    {
    Task<List<Employee>> GetEmployeeListAsync();
    }

