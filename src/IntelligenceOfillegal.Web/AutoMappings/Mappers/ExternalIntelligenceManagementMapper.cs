using System;
using AutoMapper;
using System.Linq;
using System.Collections.Generic;
using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Web.Models;
using IntelligenceOfillegal.Web.Helpers;

namespace IntelligenceOfillegal.Web.AutoMappings.Mappers
{
    public class ExternalIntelligenceManagementMapper : Profile
    {
        public ExternalIntelligenceManagementMapper()
        {
            CreateMap<ExternalIntelligence, ExternalIntelligenceDTO>()
                  .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.CreateTime)))
                .ReverseMap();
        }
    }
}