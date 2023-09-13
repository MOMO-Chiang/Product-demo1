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
    [RoutePrefix("api/systemUsers")]
    public class SystemUsersController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SystemUsersController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// 查詢使用者帳號資料
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult Get([FromUri] SystemUsersQueryParams queryParams)
        {
            List<SysUserListDTO> list = new List<SysUserListDTO>();
            var searchModel = new SystemUsersSearchModel
            {
                UserId = queryParams.UserId,
                UserName = queryParams.UserName,
                UnitCode = queryParams.UnitCode,
                UnitName = queryParams.UnitName,
                Permission = queryParams.Permission,
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
                Tuple<IEnumerable<SysUserList>, int> tuple = _unitOfWork.SysUserListRepository.SearchPaginated(searchModel, paginated);
                IEnumerable<SysUserList> sysUserList = tuple.Item1;
                var totalCount = tuple.Item2;

                PaginatedResult<SysUserListDTO> pageResult = new PaginatedResult<SysUserListDTO>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                        PageCount = sysUserList.Count(),
                        TotalCount = totalCount
                    },
                    Data = _mapper.Map<List<SysUserList>, List<SysUserListDTO>>(sysUserList.ToList()),
                };

                return Ok(pageResult);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 更新使用者帳號資料
        /// </summary>
        /// <param name="updateParams"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("edit/{userId}")]
        public IHttpActionResult Put([FromUri] string UserId, SystemUsersUpdateParams updateParams)
        {
            #region 檢核參數
            if (string.IsNullOrEmpty(UserId))
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ErrorType.INVALID_REQUEST_PARAMETERS, $"未輸入使用者帳號"));
            }
            #endregion

            try
            {
                var updateModel = new SystemUsersUpdateModel
                {
                    UserId = UserId,
                    IsValid = updateParams.IsValid,
                    Permission = updateParams.Permission,
                    UpdateUserId = "t0033",//未完成
                    UpdateUserName = "",//未完成
                    UpdateTime = DateTime.Now,
                };

                if (updateModel.Permission == 4) updateModel.IsAdmin = true;
                else updateModel.IsAdmin = false;

                _unitOfWork.SysUserListRepository.UpdateSysUserList(updateModel);

                return Ok();
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 更新使用者帳號資料 只改IsValid
        /// </summary>
        /// <param name="updateParams"></param>
        /// <returns></returns>
        [HttpPatch]
        [Route("edit/{userId}")]
        public IHttpActionResult Patch([FromUri] string UserId, SystemUsersUpdateParams updateParams)
        {
            #region 檢核參數
            if (string.IsNullOrEmpty(UserId))
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ErrorType.INVALID_REQUEST_PARAMETERS, $"未輸入使用者帳號"));
            }
            #endregion

            try
            {
                var updateModel = new SystemUsersUpdateModel
                {
                    UserId = UserId,
                    IsValid = !updateParams.IsValid,
                    UpdateUserId = "t0033",//未完成
                    UpdateUserName = "",//未完成
                    UpdateTime = DateTime.Now,
                };

                _unitOfWork.SysUserListRepository.UpdateIsValid(updateModel);

                return Ok();
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }
    }
}