using Autofac;
using Autofac.Integration.WebApi;
using AutoMapper;
using IntelligenceOfillegal.Core.DbConnectionFactory;
using IntelligenceOfillegal.Core.Repositories;
using IntelligenceOfillegal.Core.Repositories.Interfaces;
using IntelligenceOfillegal.Core.UnitOfWork;
using IntelligenceOfillegal.Web.AutoMappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;

namespace IntelligenceOfillegal.Web.App_Start
{
    public class AutofacConfig
    {
        public static void Bootstrapper()
        {
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly‌​());

            builder.RegisterType<DbConnectionFactory>()
                .As<IDbConnectionFactory>()
                .InstancePerLifetimeScope();
            //builder.RegisterType<UserListService>().As<IUserListService>();
            builder.Register(c => MappingConfiguration.CreateMapper(c.Resolve<IUnitOfWork>()))
            .As<IMapper>()
            .InstancePerLifetimeScope();
            var assemblies = AppDomain.CurrentDomain.GetAssemblies();
            builder.RegisterAssemblyTypes(assemblies)
                .Where(t => t.Name.EndsWith("Controller"))
                .AsImplementedInterfaces();

            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();
            //builder.RegisterType<FileUnitOfWork>().As<IFileUnitOfWork>().InstancePerLifetimeScope();

            IContainer container = builder.Build();
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}