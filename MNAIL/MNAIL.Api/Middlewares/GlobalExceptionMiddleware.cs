using System.Net;
using System.Text.Json;
using MNAIL.Core.Exceptions;
using MNAIL.Core.Models;

namespace MNAIL.Api.Middlewares;

public class GlobalExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionMiddleware> _logger;

    public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (BusinessException ex)
        {
            // 业务异常（如：用户名已存在、密码错误）
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            await context.Response.WriteAsJsonAsync(new
            {
                code = 400,
                message = ex.Message
            });
        }
        catch (Exception ex)
        {
            // 系统未知异常
            _logger.LogError(ex, "系统异常：{Message}", ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            await context.Response.WriteAsJsonAsync(new
            {
                code = 500,
                message = "服务器繁忙，请稍后再试"
            });
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";
        var response = context.Response;

        var apiResponse = new ApiResponse<object>();

        switch (ex)
        {
            case KeyNotFoundException kex:
                response.StatusCode = (int)HttpStatusCode.NotFound;
                apiResponse.Success = false;
                apiResponse.Message = kex.Message;
                break;

            case BusinessException bex:
                response.StatusCode = (int)HttpStatusCode.BadRequest;
                apiResponse.Success = false;
                apiResponse.Message = bex.Message;
                break;

            default:
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                apiResponse.Success = false;
                apiResponse.Message = "服务器内部错误";
                break;
        }

        _logger.LogError(ex, ex.Message);
        var json = JsonSerializer.Serialize(apiResponse);
        await context.Response.WriteAsync(json);
    }
}