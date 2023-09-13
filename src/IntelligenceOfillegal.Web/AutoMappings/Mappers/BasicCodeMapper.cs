using System;
using AutoMapper;
using System.Linq;
using System.Collections.Generic;
using IntelligenceOfillegal.Core.Models;
using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Web.Models;
using IntelligenceOfillegal.Web.Helpers;

namespace IntelligenceOfillegal.Web.AutoMappings.Mappers
{
    public class BasicCodeMapper : Profile
    {
        public BasicCodeMapper()
        {
            CreateMap<BasicCodeQueryModel, BasicCodeDTO>()
                .ForMember(v => v.UpdateTime, v => v.MapFrom(o => o.UpdateTime == null ? "" : DateTimeHelper.ConvertToDateTimeString((DateTime)o.UpdateTime)))
                .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.CreateTime)))
                .ReverseMap();
        }
    }
}