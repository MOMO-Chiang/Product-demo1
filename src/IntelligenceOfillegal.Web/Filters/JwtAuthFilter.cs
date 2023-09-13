using IntelligenceOfillegal.Common.Securities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace IntelligenceOfillegal.Web.Filters
{
    public class JwtAuthFilter : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            HttpRequestHeaders headers = actionContext.Request.Headers;
            //if (!headers.TryGetValues("CustomAuthorization", out IEnumerable<string> values))
            //{
            //    return base.IsAuthorized(actionContext);
            //}
            //var authorizationString = values.FirstOrDefault();

            //if (!AuthenticationHeaderValue.TryParse(authorizationString, out AuthenticationHeaderValue authorization))
            //{
            //    return base.IsAuthorized(actionContext);
            //}

            //if (authorization == null || authorization.Scheme != "Bearer")
            //{
            //    return base.IsAuthorized(actionContext);
            //}

            //var token = authorization.Parameter;
            //if (!JwtManager.TryValidateToken(token, out ClaimsPrincipal principal))
            //{
            //    return base.IsAuthorized(actionContext);
            //}

            //IAuthService authService = GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IAuthService)) as IAuthService;
            //if (!authService.TryValidateTokenSystemCode(token))
            //{
            //    return base.IsAuthorized(actionContext);
            //}

            return true;
        }
    }
}