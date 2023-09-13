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
using IntelligenceOfillegal.Core.Entities;
using System.Web;
using System.IO;
using Newtonsoft.Json;
using AutoMapper;
using NPOI.SS.Formula.Functions;

namespace IntelligenceOfillegal.Web.Controllers
{
    [RoutePrefix("api/systemunitrespperson")]
    public class SystemUnitRespPersonController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SystemUnitRespPersonController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// 取得單位承辦人列表
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult Get([FromUri] SystemUnitRespPersonQueryParams queryParams)
        {

            var queryModel = new SystemUnitRespPersonSearchModel
            {
                UnitCode = queryParams.UnitCode,
                UnitName = queryParams.UnitName,
                ResponsiblePerson = queryParams.ResponsiblePerson,
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
                Tuple<IEnumerable<SystemUnitRespPerson>, int> tuple = _unitOfWork.SystemUnitRespPersonRepository.SearchPaginated(queryModel, paginated);
                IEnumerable<SystemUnitRespPerson> systemUnitRespPersonLists = tuple.Item1;
                var totalCount = tuple.Item2;
                PaginatedResult<SystemUnitRespPersonDisplayModel> pageResult = new PaginatedResult<SystemUnitRespPersonDisplayModel>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                        PageCount = systemUnitRespPersonLists.Count(),
                        TotalCount = totalCount
                    },
                    Data = _mapper.Map<List<SystemUnitRespPerson>, List<SystemUnitRespPersonDisplayModel>>(systemUnitRespPersonLists.ToList()),
                };

                return Ok(pageResult);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 取得單位承辦人頁面下拉選單
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("selectoptions")]
        public IHttpActionResult GetSelectOptions([FromUri] string unitCode)
        {

            try
            {
                IEnumerable<SelectOptions> selectOptions = _unitOfWork.SystemUnitRespPersonRepository.GetResponsiblePersonOptions(unitCode);

                return Ok(selectOptions);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 更新單位承辦人
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("edit/{seq}")]
        public IHttpActionResult POST([FromUri] string seq, SystemUnitRespPersonUpdateParams updateParams)
        {
            #region 檢核參數
            if (string.IsNullOrEmpty(seq))
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ErrorType.INVALID_REQUEST_PARAMETERS, $"未輸入seq"));
            }
            #endregion

            try
            {
                var currentReq = HttpContext.Current.Request;
                string createIP = currentReq.UserHostAddress;

                var responsiblePersons = new List<string>
                {
                    updateParams.ResponsiblePerson1,
                    updateParams.ResponsiblePerson2,
                    updateParams.ResponsiblePerson3
                };

                // 去除重複值
                var distinctResponsibles = responsiblePersons
                    .Distinct()
                    .ToList();

                SystemUnitRespPerson updateModel = new SystemUnitRespPerson
                {
                    Seq = long.Parse(seq),
                    ResponsiblePerson1 = distinctResponsibles.ElementAtOrDefault(0), // 獲取第一個不重複值
                    ResponsiblePerson2 = distinctResponsibles.ElementAtOrDefault(1), // 獲取第二個不重複值
                    ResponsiblePerson3 = distinctResponsibles.ElementAtOrDefault(2), // 獲取第三個不重複值
                    UpdateUserId = currentReq.AnonymousID ?? null,
                    UpdateTime = DateTime.Now,
                };

                _unitOfWork.SystemUnitRespPersonRepository.UpdateSystemUnitRespPerson(updateModel);

                return Ok();
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }
    }
}
