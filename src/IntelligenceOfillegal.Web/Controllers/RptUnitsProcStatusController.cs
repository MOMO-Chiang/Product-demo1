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
    [RoutePrefix("api/rptunitsprocstatus")]
    public class RptUnitsProcStatusController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        DateTimeHelper dateTimeHelper = new DateTimeHelper();

        public RptUnitsProcStatusController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// 取得廉政處提報單位統計表
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get ([FromUri] RptUnitsProcStatusListQueryParams queryParams)
        {

            var queryModel = new RptUnitsProcStatusListSearchModel
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
                Tuple<IEnumerable<RptUnitsProcStatusListModel>, int> tuple = _unitOfWork.RptUnitsProcStatusRepository.SearchPaginated(queryModel, paginated);
                IEnumerable<RptUnitsProcStatusListModel> rptUnitsProcStatusLists = tuple.Item1.Select(item =>  new RptUnitsProcStatusListModel
                {
                     UnitCode = item.UnitCode,
                     UnitName = item.UnitName,
                     TotalCount = item.TotalCount,
                     UnderSigning = item.UnderSigning,
                     AssignToFieldwork = item.AssignToFieldwork,
                     AssignToInvestigation = item.AssignToInvestigation,
                     FileForReference = item.FileForReference,
                     MergeCase =  item.MergeCase,
                     AssistToInvestigation = item.AssistToInvestigation
                });
                var totalCount = tuple.Item2;
                PaginatedResult<RptUnitsProcStatusListModel> pageResult = new PaginatedResult<RptUnitsProcStatusListModel>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                        PageCount = rptUnitsProcStatusLists.Count(),
                        TotalCount = totalCount
                    },
                    Data = rptUnitsProcStatusLists.ToList(),
                };

                return Ok(pageResult);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 取得廉政處提報單位統計表 Excel
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("export-excel")]
        public IHttpActionResult ExportExcel([FromBody] RptUnitsProcStatusListQueryParams queryParams)
        {
            var queryModel = new RptUnitsProcStatusListSearchModel
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
                var RptUnitsProcStatusLists = _unitOfWork.RptUnitsProcStatusRepository.SearchPaginated(queryModel, paginated);
                PaginatedResult<RptUnitsProcStatusListModel> pageResult = new PaginatedResult<RptUnitsProcStatusListModel>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(RptUnitsProcStatusLists.Item2 / (double)paginated.PageSize),
                        PageCount = RptUnitsProcStatusLists.Item1.Count(),
                        TotalCount = RptUnitsProcStatusLists.Item2
                    },
                    Data = RptUnitsProcStatusLists.Item1.Select(item => new RptUnitsProcStatusListModel
                    {
                        UnitName = item.UnitName,
                        TotalCount = item.TotalCount == null ? "0" : item.TotalCount,
                        UnderSigning = item.UnderSigning == null ? "0" : item.UnderSigning,
                        AssignToFieldwork = item.AssignToFieldwork == null ? "0" : item.AssignToFieldwork,
                        AssignToInvestigation = item.AssignToInvestigation == null ? "0" : item.AssignToInvestigation,
                        FileForReference = item.FileForReference == null ? "0" : item.FileForReference,
                        MergeCase = item.MergeCase == null ? "0" : item.MergeCase,
                        AssistToInvestigation = item.AssistToInvestigation == null ? "0" : item.AssistToInvestigation
                    }).ToList(),
                };

                var fileHelper = new FileHelper();
                List<FileColumns> columns = new List<FileColumns>()
                {
                    new FileColumns(){Name="UnitName", Title="單位"},
                    new FileColumns(){Name="TotalCount", Title="總件數"},
                    new FileColumns(){Name="UnderSigning", Title="簽辦中"},
                    new FileColumns(){Name="AssignToFieldwork", Title="發交外勤"},
                    new FileColumns(){Name="AssignToInvestigation", Title="發查"},
                    new FileColumns(){Name="FileForReference", Title="存查"},
                    new FileColumns(){Name="MergeCase", Title="併案"},
                    new FileColumns(){Name="AssistToInvestigation", Title="協查"},
                };

                var stream = fileHelper.ExportFile<RptUnitsProcStatusListModel>(columns, pageResult.Data);
                var res = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(stream.ToArray())
                };

                res.Content.Headers.ContentDisposition =
                    new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                    {
                        FileName = HttpUtility.UrlEncode("廉政處提報單位統計表.xlsx")
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
