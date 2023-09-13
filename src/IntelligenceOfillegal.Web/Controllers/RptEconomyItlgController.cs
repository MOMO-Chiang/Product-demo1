using IntelligenceOfillegal.Common.Constants;
using IntelligenceOfillegal.Common.Utilities;
using IntelligenceOfillegal.Core.Repositories;
using IntelligenceOfillegal.Web.Helpers;
using IntelligenceOfillegal.Web.Models;
using System;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Configuration;
using System.Net.Http;
using System.Text;
using System.Linq;
using IntelligenceOfillegal.Core.UnitOfWork;
using System.Collections.Generic;
using IntelligenceOfillegal.Core.Models;
using NPOI.XSSF.UserModel;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using System.IO;
using IntelligenceOfillegal.Core.Entities;
using System.Net.Http.Headers;
using System.Web;

namespace IntelligenceOfillegal.Web.Controllers
{
    [RoutePrefix("api/rpteconomyitlg")]
    public class RptEconomyItlgController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        DateTimeHelper dateTimeHelper = new DateTimeHelper();

        public RptEconomyItlgController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        
        /// <summary>
        /// 取得經防處國情處理報表資料
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get ([FromUri] RptEconomyItlgListQueryParams queryParams)
        {
            var queryModel = new RptEconomyItlgListSearchModel
            {
                SetFileStartDate = !string.IsNullOrEmpty(queryParams.SetFileStartDate) ? Convert.ToDateTime(queryParams.SetFileStartDate) : (DateTime?)null,
                SetFileEndDate = !string.IsNullOrEmpty(queryParams.SetFileEndDate) ? Convert.ToDateTime(queryParams.SetFileEndDate).AddDays(1) : (DateTime?)null,
                ItlgSrcReportUnitName = queryParams.ItlgSrcReportUnitName
            };

            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };
            try
            {
                Tuple<IEnumerable<RptEconomyItlgListModel>, int> tuple = _unitOfWork.RptEconomyItlgRepository.SearchPaginated(queryModel, paginated);
                IEnumerable<RptEconomyItlgListModel> rptEconomyItlgLists = tuple.Item1.Select(item =>  new RptEconomyItlgListModel
                {
                    ItlgSrcFileNo = item.ItlgSrcFileNo,
                    ItlgSrcCreateFileDate = dateTimeHelper.ParseAndFormatDate(item.ItlgSrcCreateFileDate),
                    IntelligenceNo = item.IntelligenceNo,
                    ItlgSrcCaseName = item.ItlgSrcCaseName,
                    ItlgSrcSupervisorId = item.ItlgSrcSupervisorId,
                    SupervisorId = item.SupervisorId,
                    InvestigateProgressCode = item.InvestigateProgressCode,
                    InvestigateProgressName = item.InvestigateProgressName,
                    ReceiveReportNum = item.ReceiveReportNum,
                    ItlgSrcReportUnitCode = item.ItlgSrcReportUnitCode,
                    ItlgSrcReportUnitName = item.ItlgSrcReportUnitName,
                    CaseDistributeUnit = item.CaseDistributeUnit,
                    CaseDistributeUnitName = item.CaseDistributeUnitName
                });
                var totalCount = tuple.Item2;
                PaginatedResult<RptEconomyItlgListModel> pageResult = new PaginatedResult<RptEconomyItlgListModel>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                        PageCount = rptEconomyItlgLists.Count(),
                        TotalCount = totalCount
                    },
                    Data = rptEconomyItlgLists.ToList(),
                };

                return Ok(pageResult);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 取得經防處國情處理報表資料 Excel
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("export-excel")]
        public IHttpActionResult ExportExcel([FromBody] RptEconomyItlgListQueryParams queryParams)
        {
            var queryModel = new RptEconomyItlgListSearchModel
            {
                SetFileStartDate = !string.IsNullOrEmpty(queryParams.SetFileStartDate) ? Convert.ToDateTime(queryParams.SetFileStartDate) : (DateTime?)null,
                SetFileEndDate = !string.IsNullOrEmpty(queryParams.SetFileEndDate) ? Convert.ToDateTime(queryParams.SetFileEndDate).AddDays(1) : (DateTime?)null,
                ItlgSrcReportUnitName = queryParams.ItlgSrcReportUnitName
            };

            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                IsAll = true,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };

            try
            {
                var RptEconomyItlgLists = _unitOfWork.RptEconomyItlgRepository.SearchPaginated(queryModel, paginated);
                PaginatedResult<RptEconomyItlgListModel> pageResult = new PaginatedResult<RptEconomyItlgListModel>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(RptEconomyItlgLists.Item2 / (double)paginated.PageSize),
                        PageCount = RptEconomyItlgLists.Item1.Count(),
                        TotalCount = RptEconomyItlgLists.Item2
                    },
                    Data = RptEconomyItlgLists.Item1.Select(item => new RptEconomyItlgListModel
                    {
                        ItlgSrcFileNo = item.ItlgSrcFileNo,
                        ItlgSrcCreateFileDate = dateTimeHelper.ParseAndFormatDate(item.ItlgSrcCreateFileDate),
                        IntelligenceNo = item.IntelligenceNo,
                        ItlgSrcCaseName = item.ItlgSrcCaseName,
                        ItlgSrcSupervisorId = item.ItlgSrcSupervisorId,
                        SupervisorId = item.SupervisorId,
                        InvestigateProgressCode = item.InvestigateProgressCode,
                        InvestigateProgressName = item.InvestigateProgressName,
                        ReceiveReportNum = item.ReceiveReportNum,
                        ItlgSrcReportUnitCode = item.ItlgSrcReportUnitCode,
                        ItlgSrcReportUnitName = item.ItlgSrcReportUnitName,
                        CaseDistributeUnit = item.CaseDistributeUnit,
                        CaseDistributeUnitName = item.CaseDistributeUnitName
                    }).ToList(),
                };

                var fileHelper = new FileHelper();
                List<FileColumns> columns = new List<FileColumns>()
                {
                    new FileColumns(){Name="ItlgSrcFileNo", Title="一處文號"},
                    new FileColumns(){Name="ItlgSrcCreateFileDate", Title="收文日期"},
                    new FileColumns(){Name="IntelligenceNo", Title="新流水號"},
                    new FileColumns(){Name="ItlgSrcCaseName", Title="主旨"},
                    new FileColumns(){Name="ItlgSrcSupervisorId", Title="主承辦人"},
                    new FileColumns(){Name="SupervisorId", Title="業務承辦人"},
                    new FileColumns(){Name="InvestigateProgressName", Title="案件狀態"},
                    new FileColumns(){Name="ReceiveReportNum", Title="公文號"},
                    new FileColumns(){Name="ItlgSrcReportUnitName", Title="來文單位"},
                    new FileColumns(){Name="CaseDistributeUnitName", Title="外勤單位"},
                };

                var stream = fileHelper.ExportFile<RptEconomyItlgListModel>(columns, pageResult.Data);
                var res = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(stream.ToArray())
                };

                res.Content.Headers.ContentDisposition =
                    new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                    {
                        FileName = HttpUtility.UrlEncode("經防處國情處理報表.xlsx")
                    };

                res.Content.Headers.ContentType =
                    new MediaTypeHeaderValue("application/vnd.ms-excel");

                return ResponseMessage(res); 
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }


    }
}
