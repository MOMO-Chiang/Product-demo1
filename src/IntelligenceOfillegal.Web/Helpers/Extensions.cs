using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Web;

namespace IntelligenceOfillegal.Web.Helpers
{
    public static class Extensions
    {
        public static string GetCaseNoFromHeader(this HttpRequestMessage request)
        {
            var value = "N/A";
            if (request.Headers.Contains("case_no"))
            {
                var cn = request.Headers.GetValues("case_no").First();
                value = System.Web.HttpUtility.UrlDecode(cn.Trim());
            }
            return value;
        }
        public static string GetRequesterIDFromHeader(this HttpRequestMessage request)
        {
            var value = "N/A";
            if (request.Headers.Contains("requester_id"))
            {
                var cn = request.Headers.GetValues("requester_id").First();
                value = System.Web.HttpUtility.UrlDecode(cn.Trim());
            }
            return value;
        }
        //public static string GetUserIdFromToken(this HttpRequestMessage request)
        //{
        //    var value = "";
        //    if (request.Headers.Contains("CustomAuthorization"))
        //    {
        //        string authorizationString = request.Headers.GetValues("CustomAuthorization").First();
        //        AuthenticationHeaderValue authorization = AuthenticationHeaderValue.Parse(authorizationString);
        //        string token = authorization.Parameter;

        //        return JwtManager.GetPersonId(token);
        //    }
        //    return value;
        //}
    }
}