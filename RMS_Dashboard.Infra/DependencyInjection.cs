using Microsoft.Extensions.DependencyInjection;
using RMS_Dashboard.Core.RepositoryContracts;
using RMS_Dashboard.Infrastructure.DbContext;
using RMS_Dashboard.Infrastructure.Repositories;


namespace RMS_Dashboard.Infrastructure;

    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
         services.AddTransient<IEmployeeRepository, EmployeeRepository>();

        services.AddTransient<DapperDbContext>();
        return services;
        }
    }

