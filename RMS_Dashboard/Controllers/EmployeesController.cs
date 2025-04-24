using Microsoft.AspNetCore.Mvc;
using RMS_Dashboard.Core.Entities;
using RMS_Dashboard.Core.ServiceContracts;
using RMS_Dashboard.Data;

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

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Employee>>> GetById([FromRoute] string id)
        {
            return Ok(await _employeeService.GetEmployeeById(id));
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadExcel([FromServices] ExcelDataImporter importer, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var tempPath = Path.Combine(Path.GetTempPath(), Guid.NewGuid() + Path.GetExtension(file.FileName));
            try
            {
                using (var stream = new FileStream(tempPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                await importer.ImportEmployeesAsync(tempPath);

                return Ok("File processed and data imported successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
            finally
            {
                if (System.IO.File.Exists(tempPath))
                {
                    System.IO.File.Delete(tempPath);
                }
            }
        }

    }
}
