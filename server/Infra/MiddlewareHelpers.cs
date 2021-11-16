using System.Net.Http;
using Microsoft.AspNetCore.Http;

namespace server.Infra
{
    public static class MiddlewareHelpers
    {
        public static bool SessionStateChangingRequests(HttpContext context)
        {
            return context.Request.Method == HttpMethod.Post.ToString() && SessionIdInRoute(context);
        }

        public static bool SessionIdInRoute(HttpContext context)
        {
            return context.Request.RouteValues.ContainsKey("sessionId");
        }
    }
}