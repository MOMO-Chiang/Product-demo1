using IntelligenceOfillegal.Common.Constants;
using IntelligenceOfillegal.Web.Helpers;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;

namespace IntelligenceOfillegal.Web.Filters
{
    public class ErrorHandlerAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionContext)
        {
            var exception = actionContext.Exception;
            if (exception == null)
            {
                return;
            }

            var response = APIHelper.CreateAPIError(ErrorType.SERVER_INTERNAL_ERROR, "伺服器內部處理發生錯誤。", exception.StackTrace.ToString());

            actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.InternalServerError, response);

            throw new HttpResponseException(actionContext.Response);
        }
    }
}