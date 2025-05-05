
using Microsoft.EntityFrameworkCore;
using RMS_Dashboard.Core;
using RMS_Dashboard.Data;
using RMS_Dashboard.Infrastructure;

namespace RMS_Dashboard
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddInfrastructure();
            builder.Services.AddCore();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<RmsDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddLogging();
            builder.Services.AddScoped<ExcelDataImporter>();

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var logger = services.GetRequiredService<ILogger<ExcelDataImporter>>();
                var importer = new ExcelDataImporter(services.GetRequiredService<RmsDbContext>(), logger);

                var dataFilePath = Path.Combine(AppContext.BaseDirectory, "Data", "Back_Up_Dump_data.xlsx");
                await importer.ImportEmployeesAsync(dataFilePath);
            }

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
