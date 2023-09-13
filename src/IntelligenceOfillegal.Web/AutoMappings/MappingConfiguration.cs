using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using IntelligenceOfillegal.Core.UnitOfWork;
using IntelligenceOfillegal.Web.AutoMappings.Mappers;

namespace IntelligenceOfillegal.Web.AutoMappings
{
    public class MappingConfiguration
    {
        public static IMapper CreateMapper(IUnitOfWork unitOfWork)
        {
            var mappingConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new SystemUsersMapper());
                cfg.AddProfile(new BasicCodeMapper());
                cfg.AddProfile(new CaseManagementMapper(unitOfWork));
                cfg.AddProfile(new SystemUnitRespPersonMapper(unitOfWork));
                cfg.AddProfile(new ExternalIntelligenceManagementMapper());
            });

            return mappingConfig.CreateMapper();
        }
    }
}
