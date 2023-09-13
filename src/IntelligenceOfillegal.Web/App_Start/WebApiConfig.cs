using IntelligenceOfillegal.Web.Filters;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace IntelligenceOfillegal.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // JwtAutjFilters
            config.Filters.Add(new JwtAuthFilter());
            // Filters
            config.Filters.Add(new ErrorHandlerAttribute());


            // Web API routes
            config.MapHttpAttributeRoutes();

            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver
                = new CamelCasePropertyNamesContractResolver();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
