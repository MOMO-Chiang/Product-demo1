using IntelligenceOfillegal.Common.Constants;
using IntelligenceOfillegal.Common.Utilities;
using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.Models;
using IntelligenceOfillegal.Core.UnitOfWork;
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
using System.Collections.Generic;
using AutoMapper;

namespace IntelligenceOfillegal.Web.Controllers
{
    [RoutePrefix("api/basicCode")]
    public class BasicCodeController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BasicCodeController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// 查詢基礎代碼資料
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get([FromUri] BasicCodeQueryParams queryParams)
        {
            List<BasicCodeDTO> list = new List<BasicCodeDTO>();
            var searchModel = new BasicCodeSearchModel
            {
                Category = queryParams.Category,
                CategoryCode = queryParams.CategoryCode,
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
                Tuple<IEnumerable<BasicCodeQueryModel>, int> tuple = _unitOfWork.EnumerationValueRepository.SearchPaginated(searchModel, paginated);
                IEnumerable<BasicCodeQueryModel> basicCodeQueryModel = tuple.Item1;
                var totalCount = tuple.Item2;

                PaginatedResult<BasicCodeDTO> pageResult = new PaginatedResult<BasicCodeDTO>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                        PageCount = basicCodeQueryModel.Count(),
                        TotalCount = totalCount
                    },
                    Data = _mapper.Map<List<BasicCodeQueryModel>, List<BasicCodeDTO>>(basicCodeQueryModel.ToList()),
                };

                return Ok(pageResult);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 查詢基礎代碼 類別項目資料
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("categoryCode")]
        public IHttpActionResult GetCategoryCode()
        {
            try
            {
                IEnumerable<SelectOptions> selectOptions = _unitOfWork.EnumerationRepository.GetSelectOptions();
                
                return Ok(selectOptions);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 新增基礎代碼資料
        /// </summary>
        /// <param name="inParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("add")]
        public IHttpActionResult Post([FromBody] BasicCodeCreateParams createParams)
        {
            #region 檢核參數
            if (string.IsNullOrEmpty(createParams.CategoryCode))
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ErrorType.INVALID_REQUEST_PARAMETERS, $"請挑選類別代碼"));
            }
            if (string.IsNullOrEmpty(createParams.Value))
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ErrorType.INVALID_REQUEST_PARAMETERS, $"未輸入顯示名稱代碼"));
            }
            #endregion

            try
            {
                EnumerationValue checkData = _unitOfWork.EnumerationValueRepository.GetByCategoryCodeAndValue(createParams.CategoryCode, createParams.Value);
                if (checkData != null)
                {
                    return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ErrorType.INVALID_REQUEST_PARAMETERS, $"顯示名稱代碼已使用"));
                }
                else
                {
                    EnumerationValue enumerationValue = new EnumerationValue
                    {
                        //Seq = seq,
                        CategoryCode = createParams.CategoryCode,
                        Value = createParams.Value,
                        Text = createParams.Text,
                        IsActived = createParams.IsActived,
                        //UpdatePersonId = createParams.UpdatePersonId,
                        //UpdateTime = DateTime.Now,
                        CreatePersonId = "t0033",
                        CreateIP = GetClientIP(),
                        CreateTime = DateTime.Now,
                    };

                    _unitOfWork.EnumerationValueRepository.Insert(enumerationValue);

                    return Ok();
                }
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 更新基礎代碼資料
        /// </summary>
        /// <param name="updateParams"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("edit/{value}")]
        public IHttpActionResult Put([FromUri] string Value, BasicCodeUpdateParams updateParams)
        {
            #region 檢核參數
            if (string.IsNullOrEmpty(Value))
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ErrorType.INVALID_REQUEST_PARAMETERS, $"查無顯示名稱代碼"));
            }
            #endregion

            try
            {
                var updateModel = new BasicCodeUpdateModel
                {
                    Value = Value,
                    Text = updateParams.Text,
                    IsActived = updateParams.IsActived,
                    CategoryCode = updateParams.CategoryCode,
                    UpdatePersonId = "t0033",//未完成
                    UpdateTime = DateTime.Now,
                };

                _unitOfWork.EnumerationValueRepository.UpdateBasicCode(updateModel);

                return Ok();
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 更新基礎代碼資料 IsActived
        /// </summary>
        /// <param name="updateParams"></param>
        /// <returns></returns>
        [HttpPatch]
        [Route("edit/{value}")]
        public IHttpActionResult Patch([FromUri] string Value, BasicCodeUpdateParams updateParams)
        {
            #region 檢核參數
            if (string.IsNullOrEmpty(Value))
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ErrorType.INVALID_REQUEST_PARAMETERS, $"查無顯示名稱代碼"));
            }
            #endregion

            try
            {
                var updateModel = new BasicCodeUpdateModel
                {
                    Value = Value,
                    IsActived = !updateParams.IsActived,
                    CategoryCode = updateParams.CategoryCode,
                    UpdatePersonId = "t0033",//未完成
                    UpdateTime = DateTime.Now,
                };

                _unitOfWork.EnumerationValueRepository.UpdateIsActived(updateModel);

                return Ok();
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 取得類別代碼  下拉選單選項
        /// </summary>
        [HttpGet]
        [Route("selectoptions")]
        public IHttpActionResult GetSelectOptions()
        {
            try
            {
                List<SelectOptions> list = new List<SelectOptions>();
                list = _unitOfWork.EnumerationRepository.GetSelectOptions();

                return Ok(list);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 取得使用者ClientIP
        /// </summary>
        public string GetClientIP()
        {
            string clientIP = "";
            string hostName = null;

            IPHostEntry host = default(IPHostEntry);
            hostName = System.Environment.MachineName;
            host = Dns.GetHostEntry(hostName);
            foreach(IPAddress ip in host.AddressList )
            {
                if (ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork) clientIP = Convert.ToString(ip);
            }

            return clientIP;
        }
    }
}