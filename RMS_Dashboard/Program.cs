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

            // Add CORS policy for React development
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactDevCorsPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:3000") // React dev server
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var logger = services.GetRequiredService<ILogger<ExcelDataImporter>>();
                var importer = new ExcelDataImporter(services.GetRequiredService<RmsDbContext>(), logger);

                var dataFilePath = Path.Combine(AppContext.BaseDirectory, "Data", "Book 5 (2).xlsx");

                await importer.ImportEmployeesAsync(dataFilePath);
            }

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Use the CORS policy
            app.UseCors("ReactDevCorsPolicy");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
