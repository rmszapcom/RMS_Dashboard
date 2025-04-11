using Microsoft.AspNetCore.Mvc;
using RMS_Dashboard.Core.Entities;
using RMS_Dashboard.Core.ServiceContracts;

namespace RMS_Dashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        public EmployeesController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }


        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAllEmployees()
        {
            var employees = await _employeeService.GetEmployeeListAsync();
            return Ok(employees);
        }
    }
}
