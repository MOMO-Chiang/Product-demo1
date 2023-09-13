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
    public class CaseManagementMapper : Profile
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly List<EnumerationValue> _enumerationValue;

        public CaseManagementMapper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _enumerationValue = _unitOfWork.EnumerationValueRepository.GetAllValue();

            CreateMap<CaseManagement, CaseManagementTableDTO>()
                .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToRocDateString(o.CreateTime)))
                .ForMember(v => v.CaseCategory, v => v.MapFrom(o => GetEnumerationValue("CaseCategory", o.CaseCategory)))
                .ForMember(v => v.InvestigateProgressCode, v => v.MapFrom(o => GetEnumerationValue("DetectStep", o.InvestigateProgressCode)))
                .ForMember(v => v.ItlgSrcReportUnitCode, v => v.MapFrom(o => GetEnumerationValue("MjibMGR_br", o.ItlgSrcReportUnitCode)))
                .ForMember(v => v.SupervisorDepartment, v => v.MapFrom(o => GetEnumerationValue("MjibMGR_br", o.SupervisorDepartment)))
                .ReverseMap();

            CreateMap<CaseManagement, CaseManagementEditDTO>()
               .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateString(o.CreateTime)))
               .ForMember(v => v.ItlgSrcCreateFileDate, v => v.MapFrom(o => o.ItlgSrcCreateFileDate == null ? "" : DateTimeHelper.ConvertToDateString((DateTime)o.ItlgSrcCreateFileDate)))
               .ReverseMap();

            CreateMap<ObjPerson, ObjPersonDTO>()
                .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateString(o.CreateTime)))
                .ReverseMap();

            CreateMap<IntelligenceFilelist, IntelligenceFilelistDTO>()
                .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.CreateTime)))
                .ReverseMap();

            CreateMap<SupervisorCaseManagement, SupervisorCaseManagementDTO>()
                .ForMember(v => v.AssignInvestigateDate, v => v.MapFrom(o => o.AssignInvestigateDate == null ? "" : DateTimeHelper.ConvertToDateString((DateTime)o.AssignInvestigateDate)))
                .ForMember(v => v.ReCheckDate, v => v.MapFrom(o => o.ReCheckDate == null ? "" : DateTimeHelper.ConvertToDateString((DateTime)o.ReCheckDate)))
                .ReverseMap();

            CreateMap<CaseManagementTransferHistory, CaseManagementTransferHistoryDTO>()
                .ForMember(v => v.UpdateTime, v => v.MapFrom(o => o.UpdateTime == null ? "" : DateTimeHelper.ConvertToDateTimeString(o.UpdateTime)))
                .ReverseMap();
        }

        private string GetEnumerationValue(string categoryCode, string value)
        {
            return _enumerationValue.Where(x => x.Value == value && x.CategoryCode == categoryCode).FirstOrDefault()?.Text;
        }
    }
}
