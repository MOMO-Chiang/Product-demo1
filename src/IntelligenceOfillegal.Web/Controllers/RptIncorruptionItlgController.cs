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
    [RoutePrefix("api/rptincorruptionitlg")]
    public class RptIncorruptionController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        DateTimeHelper dateTimeHelper = new DateTimeHelper();

        public RptIncorruptionController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// 取得廉政處國情處理報表
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get ([FromUri] RptIncorruptionItlgListQueryParams queryParams)
        {

            var queryModel = new RptIncorruptionItlgListSearchModel
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
                Tuple<IEnumerable<RptIncorruptionItlgListModel>, int> tuple = _unitOfWork.RptIncorruptionItlgRepository.SearchPaginated(queryModel, paginated);
                IEnumerable<RptIncorruptionItlgListModel> rptIncorruptionItlgLists = tuple.Item1.Select(item =>  new RptIncorruptionItlgListModel
                {
                    Seq = item.Seq,
                    ItlgSrcUnitName = item.ItlgSrcUnitName,
                    IntelligenceNo = item.IntelligenceNo,
                    ItlgSrcCreateFileDate = dateTimeHelper.ParseAndFormatDate(item.ItlgSrcCreateFileDate),
                    ItlgSrcFileNo = item.ItlgSrcFileNo,
                    MainCaseTypeName = item.MainCaseType + " " + item.MainCaseTypeName,
                    ElectionItlgNotes = item.ElectionItlgNotes,
                    ItlgSrcSupervisorId = item.ItlgSrcSupervisorId,
                    ItlgSrcReportUnitName = item.ItlgSrcReportUnitName,
                    CreateTime = dateTimeHelper.ParseAndFormatDate(item.CreateTime),
                    ReceiveReportNum = item.ReceiveReportNum,
                    ItlgSrcCaseName = item.ItlgSrcCaseName,
                    InvestigateProgressName = item.InvestigateProgressName,
                    SupervisorDepartmentName = item.SupervisorDepartmentName,
                });
                var totalCount = tuple.Item2;
                PaginatedResult<RptIncorruptionItlgListModel> pageResult = new PaginatedResult<RptIncorruptionItlgListModel>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                        PageCount = rptIncorruptionItlgLists.Count(),
                        TotalCount = totalCount
                    },
                    Data = rptIncorruptionItlgLists.ToList(),
                };

                return Ok(pageResult);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 取得廉政處國情處理報表 Excel
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("export-excel")]
        public IHttpActionResult ExportExcel([FromBody] RptIncorruptionItlgListQueryParams queryParams)
        {
            var queryModel = new RptIncorruptionItlgListSearchModel
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
                var RptIncorruptionItlgLists = _unitOfWork.RptIncorruptionItlgRepository.SearchPaginated(queryModel, paginated);
                PaginatedResult<RptIncorruptionItlgListModel> pageResult = new PaginatedResult<RptIncorruptionItlgListModel>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(RptIncorruptionItlgLists.Item2 / (double)paginated.PageSize),
                        PageCount = RptIncorruptionItlgLists.Item1.Count(),
                        TotalCount = RptIncorruptionItlgLists.Item2
                    },
                    Data = RptIncorruptionItlgLists.Item1.Select(item => new RptIncorruptionItlgListModel
                    {
                        Seq = item.Seq,
                        ItlgSrcUnitName = item.ItlgSrcUnitName,
                        IntelligenceNo = item.IntelligenceNo,
                        ItlgSrcCreateFileDate = dateTimeHelper.ParseAndFormatDate(item.ItlgSrcCreateFileDate),
                        ItlgSrcFileNo = item.ItlgSrcFileNo,
                        MainCaseTypeName = item.MainCaseType + " " + item.MainCaseTypeName,
                        ElectionItlgNotes = item.ElectionItlgNotes,
                        ItlgSrcSupervisorId = item.ItlgSrcSupervisorId,
                        ItlgSrcReportUnitName = item.ItlgSrcReportUnitName,
                        CreateTime = dateTimeHelper.ParseAndFormatDate(item.CreateTime),
                        ReceiveReportNum = item.ReceiveReportNum,
                        ItlgSrcCaseName = item.ItlgSrcCaseName,
                        InvestigateProgressName = item.InvestigateProgressName,
                        SupervisorDepartmentName = item.SupervisorDepartmentName,
                    }).ToList(),
                };

                var fileHelper = new FileHelper();
                List<FileColumns> columns = new List<FileColumns>()
                {
                    new FileColumns(){Name="Seq", Title="項次"},
                    new FileColumns(){Name="ItlgSrcUnitName", Title="來源單位"},
                    new FileColumns(){Name="IntelligenceNo", Title="新流水號"},
                    new FileColumns(){Name="ItlgSrcCreateFileDate", Title="分送日期"},
                    new FileColumns(){Name="ItlgSrcFileNo", Title="來源字號"},
                    new FileColumns(){Name="MainCaseTypeName", Title="案件類別"},
                    new FileColumns(){Name="ElectionItlgNotes", Title="選舉情資註記"},
                    new FileColumns(){Name="ItlgSrcSupervisorId", Title="承辦人"},
                    new FileColumns(){Name="ItlgSrcReportUnitName", Title="提報單位"},
                    new FileColumns(){Name="CreateTime", Title="提報日期"},
                    new FileColumns(){Name="ReceiveReportNum", Title="公文字號"},
                    new FileColumns(){Name="ItlgSrcCaseName", Title="內容摘要"},
                    new FileColumns(){Name="InvestigateProgressName", Title="處理情形"},
                    new FileColumns(){Name="SupervisorDepartmentName", Title="承辦科"},
                };

                var stream = fileHelper.ExportFile<RptIncorruptionItlgListModel>(columns, pageResult.Data);
                var res = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(stream.ToArray())
                };

                res.Content.Headers.ContentDisposition =
                    new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                    {
                        FileName = HttpUtility.UrlEncode("廉政處國情處理報表.xlsx")
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
