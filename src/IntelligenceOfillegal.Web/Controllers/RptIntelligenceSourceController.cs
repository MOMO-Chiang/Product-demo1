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
    [RoutePrefix("api/rptintelligencesource")]
    public class RptIntelligenceSourceController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        DateTimeHelper dateTimeHelper = new DateTimeHelper();

        public RptIntelligenceSourceController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// 取得專案情資來源件數統計
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get ([FromUri] RptIntelligenceSourceListQueryParams queryParams)
        {

            var queryModel = new RptIntelligenceSourceListSearchModel
            {
                SetFileStartDate = !string.IsNullOrEmpty(queryParams.SetFileStartDate) ? Convert.ToDateTime(queryParams.SetFileStartDate) : (DateTime?)null,
                SetFileEndDate = !string.IsNullOrEmpty(queryParams.SetFileEndDate) ? Convert.ToDateTime(queryParams.SetFileEndDate).AddDays(1) : (DateTime?)null,
                CaseType = queryParams.CaseType
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
                Tuple<IEnumerable<RptIntelligenceSourceListModel>, int> tuple = _unitOfWork.RptIntelligenceSourceRepository.SearchPaginated(queryModel, paginated);
                IEnumerable<RptIntelligenceSourceListModel> rptIntelligenceSourceLists = tuple.Item1.Select(item =>  new RptIntelligenceSourceListModel
                {
                     UnitCode = item.UnitCode,
                     UnitName = item.UnitName,
                     TotalCount = item.TotalCount,
                });
                var totalCount = tuple.Item2;
                PaginatedResult<RptIntelligenceSourceListModel> pageResult = new PaginatedResult<RptIntelligenceSourceListModel>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                        PageCount = rptIntelligenceSourceLists.Count(),
                        TotalCount = totalCount
                    },
                    Data = rptIntelligenceSourceLists.ToList(),
                };

                return Ok(pageResult);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 取得專案情資來源件數統計 Excel
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("export-excel")]
        public IHttpActionResult ExportExcel([FromBody] RptIntelligenceSourceListQueryParams queryParams)
        {
            var queryModel = new RptIntelligenceSourceListSearchModel
            {
                SetFileStartDate = !string.IsNullOrEmpty(queryParams.SetFileStartDate) ? Convert.ToDateTime(queryParams.SetFileStartDate) : (DateTime?)null,
                SetFileEndDate = !string.IsNullOrEmpty(queryParams.SetFileEndDate) ? Convert.ToDateTime(queryParams.SetFileEndDate).AddDays(1) : (DateTime?)null,
                CaseType = queryParams.CaseType,
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
                var RptIntelligenceSourceLists = _unitOfWork.RptIntelligenceSourceRepository.SearchPaginated(queryModel, paginated);
                PaginatedResult<RptIntelligenceSourceListModel> pageResult = new PaginatedResult<RptIntelligenceSourceListModel>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(RptIntelligenceSourceLists.Item2 / (double)paginated.PageSize),
                        PageCount = RptIntelligenceSourceLists.Item1.Count(),
                        TotalCount = RptIntelligenceSourceLists.Item2
                    },
                    Data = RptIntelligenceSourceLists.Item1.Select(item => new RptIntelligenceSourceListModel
                    {
                        UnitName = item.UnitName,
                        TotalCount = item.TotalCount == null ? "0" : item.TotalCount
                    }).ToList(),
                };

                var fileHelper = new FileHelper();
                List<FileColumns> columns = new List<FileColumns>()
                {
                    new FileColumns(){Name="UnitName", Title="情資來源"},
                    new FileColumns(){Name="TotalCount", Title="件數"},
                };

                var stream = fileHelper.ExportFile<RptIntelligenceSourceListModel>(columns, pageResult.Data);
                var res = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(stream.ToArray())
                };

                res.Content.Headers.ContentDisposition =
                    new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                    {
                        FileName = HttpUtility.UrlEncode("專案情資來源件數統計.xlsx")
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
