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
    [RoutePrefix("api/rptlaundryitlg")]
    public class RptLaundryItlgController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        DateTimeHelper dateTimeHelper = new DateTimeHelper();

        public RptLaundryItlgController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// 取得廉政處洗錢處理報表
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get ([FromUri] RptLaundryItlgListQueryParams queryParams)
        {

            var queryModel = new RptLaundryItlgListSearchModel
            {
                SetFileStartDate = !string.IsNullOrEmpty(queryParams.SetFileStartDate) ? Convert.ToDateTime(queryParams.SetFileStartDate) : (DateTime?)null,
                SetFileEndDate = !string.IsNullOrEmpty(queryParams.SetFileEndDate) ? Convert.ToDateTime(queryParams.SetFileEndDate).AddDays(1) : (DateTime?)null,
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
                Tuple<IEnumerable<RptLaundryItlgListModel>, int> tuple = _unitOfWork.RptLaundryItlgRepository.SearchPaginated(queryModel, paginated);
                IEnumerable<RptLaundryItlgListModel> rptLaundryItlgLists = tuple.Item1.Select(item =>  new RptLaundryItlgListModel
                {
                    Seq = item.Seq,
                    ItlgSrcUnitName = item.ItlgSrcUnitName,
                    IntelligenceNo = item.IntelligenceNo,
                    ItlgSrcCreateFileDate = dateTimeHelper.ParseAndFormatDate(item.ItlgSrcCreateFileDate),
                    ItlgSrcFileNo = item.ItlgSrcFileNo,
                    MainCaseTypeName = item.MainCaseType + " " + item.MainCaseTypeName,
                    ElectionItlgNotes = item.ElectionItlgNotes,
                    ItlgSrcSupervisorId = item.ItlgSrcSupervisorId,
                    CreateTime = dateTimeHelper.ParseAndFormatDate(item.CreateTime),
                    ReceiveReportNum = item.ReceiveReportNum,
                    ItlgSrcCaseName = item.ItlgSrcCaseName,
                    InvestigateProgressName = item.InvestigateProgressName,
                    SupervisorDepartmentName = item.SupervisorDepartmentName,
                });
                var totalCount = tuple.Item2;
                PaginatedResult<RptLaundryItlgListModel> pageResult = new PaginatedResult<RptLaundryItlgListModel>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                        PageCount = rptLaundryItlgLists.Count(),
                        TotalCount = totalCount
                    },
                    Data = rptLaundryItlgLists.ToList(),
                };

                return Ok(pageResult);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 取得廉政處洗錢處理報表 Excel
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("export-excel")]
        public IHttpActionResult ExportExcel([FromBody] RptLaundryItlgListQueryParams queryParams)
        {
            var queryModel = new RptLaundryItlgListSearchModel
            {
                SetFileStartDate = !string.IsNullOrEmpty(queryParams.SetFileStartDate) ? Convert.ToDateTime(queryParams.SetFileStartDate) : (DateTime?)null,
                SetFileEndDate = !string.IsNullOrEmpty(queryParams.SetFileEndDate) ? Convert.ToDateTime(queryParams.SetFileEndDate).AddDays(1) : (DateTime?)null,
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
                var RptLaundryItlgLists = _unitOfWork.RptLaundryItlgRepository.SearchPaginated(queryModel, paginated);
                PaginatedResult<RptLaundryItlgListModel> pageResult = new PaginatedResult<RptLaundryItlgListModel>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(RptLaundryItlgLists.Item2 / (double)paginated.PageSize),
                        PageCount = RptLaundryItlgLists.Item1.Count(),
                        TotalCount = RptLaundryItlgLists.Item2
                    },
                    Data = RptLaundryItlgLists.Item1.Select(item => new RptLaundryItlgListModel
                    {
                        Seq = item.Seq,
                        ItlgSrcUnitName = item.ItlgSrcUnitName,
                        IntelligenceNo = item.IntelligenceNo,
                        ItlgSrcCreateFileDate = dateTimeHelper.ParseAndFormatDate(item.ItlgSrcCreateFileDate),
                        ItlgSrcFileNo = item.ItlgSrcFileNo,
                        MainCaseTypeName = item.MainCaseType + " " + item.MainCaseTypeName,
                        ElectionItlgNotes = item.ElectionItlgNotes,
                        ItlgSrcSupervisorId = item.ItlgSrcSupervisorId,
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
                    new FileColumns(){Name="CreateTime", Title="提報日期"},
                    new FileColumns(){Name="ReceiveReportNum", Title="公文字號"},
                    new FileColumns(){Name="ItlgSrcCaseName", Title="內容摘要"},
                    new FileColumns(){Name="InvestigateProgressName", Title="處理情形"},
                    new FileColumns(){Name="SupervisorDepartmentName", Title="承辦科"},
                };

                var stream = fileHelper.ExportFile<RptLaundryItlgListModel>(columns, pageResult.Data);
                var res = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(stream.ToArray())
                };

                res.Content.Headers.ContentDisposition =
                    new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                    {
                        FileName = HttpUtility.UrlEncode("廉政處洗錢處理報表.xlsx")
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
