
namespace RMS_Dashboard.Middlewares
{
    public class GlobalExceptionsHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionsHandlerMiddleware> _logger;

        public GlobalExceptionsHandlerMiddleware(RequestDelegate next,ILogger<GlobalExceptionsHandlerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception e)
            {
                _logger.LogError($"{e.GetType().ToString()}:{e.Message}");

                if (e.InnerException is not null)
                {
                    _logger.LogError($"{e.InnerException.GetType().ToString()}:{e.InnerException.Message}");
                }

                httpContext.Response.StatusCode = 500;

                await httpContext.Response.WriteAsJsonAsync(
                    new
                    {
                        Message = e.Message,
                        Type = e.GetType().ToString()
                    });
            }
        }
    }

    public static class GlobalExceptionsHandlerMiddlewareExtensions
    {
        public static IApplicationBuilder UseGlobalExceptionsHandlerMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<GlobalExceptionsHandlerMiddleware>();
        }
    }
}
