using Microsoft.Extensions.DependencyInjection;
using RMS_Dashboard.Core.ServiceContracts;
using RMS_Dashboard.Core.Services;

namespace RMS_Dashboard.Core
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddCore(this IServiceCollection services)
        {
            services.AddTransient<IEmployeeService, EmployeeService>();
            
            return services;
        }
    }
}
