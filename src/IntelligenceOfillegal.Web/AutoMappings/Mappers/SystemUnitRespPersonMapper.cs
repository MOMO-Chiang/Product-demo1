using System;
using AutoMapper;
using System.Linq;
using System.Collections.Generic;
using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Web.Models;
using IntelligenceOfillegal.Web.Helpers;
using IntelligenceOfillegal.Core.UnitOfWork;
using IntelligenceOfillegal.Core.Models;

namespace IntelligenceOfillegal.Web.AutoMappings.Mappers
{
    public class SystemUnitRespPersonMapper : Profile
    {
        private readonly IUnitOfWork _unitOfWork;
        public SystemUnitRespPersonMapper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

            CreateMap<SystemUnitRespPerson, SystemUnitRespPersonDisplayModel>()
               .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateString(o.CreateTime)))
               //.ForMember(v => v.ItlgSrcCreateFileDate, v => v.MapFrom(o => o.ItlgSrcCreateFileDate == null ? "" : DateTimeHelper.ConvertToDateString((DateTime)o.ItlgSrcCreateFileDate)))
               .ReverseMap();
        }
    }
}
