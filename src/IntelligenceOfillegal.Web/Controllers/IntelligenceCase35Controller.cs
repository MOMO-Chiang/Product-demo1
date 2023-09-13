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
using Org.BouncyCastle.Ocsp;
using IntelligenceOfillegal.Common.Enums;
using IntelligenceOfillegal.Core.DbConnectionFactory;
using IntelligenceOfillegal.Core.Repositories.Interfaces;
using IntelligenceOfillegal.Core.Factories;
using static IntelligenceOfillegal.Core.Factories.DepartmentFactory;
using AutoMapper;
using NPOI.POIFS.Crypt.Dsig;
using System.Web.UI.WebControls;

namespace IntelligenceOfillegal.Web.Controllers
{
    [RoutePrefix("api/intelligenceCase35")]
    public class IntelligenceCase35Controller : ApiController
    {
        /// <summary>
        /// 單位代碼
        /// </summary>
        private readonly Department Department = Department.Laundry;

        private readonly IUnitOfWork _unitOfWork;
        private readonly IDbConnectionFactory _dbConnectionFactory;
        private readonly DepartmentDBInfo _departmentInfo;
        private readonly IMapper _mapper;
        public IntelligenceCase35Controller(IUnitOfWork unitOfWork, IDbConnectionFactory dbConnectionFactory, IMapper mapper)
        {
            
            _unitOfWork = unitOfWork;
            _dbConnectionFactory = dbConnectionFactory;
            _mapper = mapper;

            DepartmentFactory departmentFactory = new DepartmentFactory();
            _departmentInfo = departmentFactory.GetDepartmentInfo(Department);

        }
        /// <summary>
        /// 取得表格資料
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult Get([FromUri] IntelligenceCaseQueryParams queryParams)
        {

            var queryModel = new ExternalIntelligenceSearchModel
            {
                IntelligenceNo = queryParams.IntelligenceNo,
                SupervisorName = queryParams.SupervisorName,
                FileNo = queryParams.FileNo,
                CaseNo = queryParams.CaseNo,
                CaseName = queryParams.CaseName,

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
                IExternalIntelligenceRepository externalIntelligenceRepository = new ExternalIntelligenceRepository(_dbConnectionFactory, _departmentInfo);
                Tuple<IEnumerable<ExternalIntelligence>, int> tuple = externalIntelligenceRepository.QuerySearchPaginated(queryModel, paginated);
                IEnumerable<ExternalIntelligence> dataList = tuple.Item1;
                var totalCount = tuple.Item2;
                PaginatedResult<ExternalIntelligenceDTO> pageResult = new PaginatedResult<ExternalIntelligenceDTO>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                        PageCount = dataList.Count(),
                        TotalCount = totalCount
                    },
                    Data = _mapper.Map<List<ExternalIntelligence>, List<ExternalIntelligenceDTO>>(dataList.ToList()),
                };

                return Ok(pageResult);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }


        /// <summary>
        /// 取得單一案件
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [Route("{id}")]
        [HttpGet]
        public IHttpActionResult GetId([FromUri] string id)
        {

            try
            {
                IExternalIntelligenceRepository externalIntelligenceRepository = new ExternalIntelligenceRepository(_dbConnectionFactory, _departmentInfo);
                IFileListRepository fileListRepository = new FileListRepository(_dbConnectionFactory, _departmentInfo.ConnectionName);
                ExternalIntelligence externalIntelligence = externalIntelligenceRepository.QuerySearch(new { intelligenceNo = id }).First();
                IEnumerable<FileList> fileList = fileListRepository.QuerySearch(new { Seq = externalIntelligence.Seq });
                //資料轉換
                var externalIntelligenceDTO = _mapper.Map<ExternalIntelligence, ExternalIntelligenceDTO>(externalIntelligence);
                Tuple<ExternalIntelligenceDTO, IEnumerable<FileList>> data = new Tuple<ExternalIntelligenceDTO, IEnumerable<FileList>>(externalIntelligenceDTO, fileList);

                return Ok(data);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }



        /// <summary>
        /// 取得頁面下拉選單
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        [Route("option")]
        [HttpPost]
        public IHttpActionResult GetOption([FromBody] string id)
        {

            try
            {
                
                IExternalIntelligenceRepository externalIntelligenceRepository = new ExternalIntelligenceRepository(_dbConnectionFactory, _departmentInfo);
                ExternalIntelligence externalIntelligence = externalIntelligenceRepository.QuerySearch(new { intelligenceNo = id }).First();

                var CaseCategory = _unitOfWork.EnumerationValueRepository.GetSelectOptions("CaseCategory");
                IFileObjPersonRepository fileObjPersonRepository = new FileObjPersonRepository(_dbConnectionFactory, _departmentInfo.ConnectionName);
                var Suspects = fileObjPersonRepository.QuerySearch<FileObjPerson>(new FileObjPerson() { Seq = externalIntelligence.Seq });
                var SuspectsOption = Suspects.Select(v => new SelectOptions
                {
                    Value = v.PersonID.ToString(),
                    Text = v.PersonName.ToString()
                });
                var supervisorDepartment = _unitOfWork.EnumerationValueRepository.GetSelectOptions("MjibMGR_br");
                var ObjType = _unitOfWork.EnumerationValueRepository.GetSelectOptions("ObjType");
                var NotObjType = _unitOfWork.EnumerationValueRepository.GetSelectOptions("NotObjType");


                var optionList = new
                {
                    CaseCategory,
                    Suspects = SuspectsOption,
                    supervisorDepartment,

                    ObjType,
                    NotObjType,
                };
                return Ok(optionList);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }


        /// <summary>
        /// 分案
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        [Route("case-distribute")]
        [HttpPost]
        public IHttpActionResult CaseDistribute([FromBody] IntelligenceCaseUpdateParams updateParams)
        {
          
            try
            {
                DataHelper dataHelper = new DataHelper();
                DateTimeHelper dateTimeHelper = new DateTimeHelper();
                FileHelper fileHelper = new FileHelper();
                _unitOfWork.BeginTransaction();
                
                /**建立不法情資編號*/
                string IntelligenceNo = dataHelper.GenIntelligenceNo();
                Guid IntelligenceCaseId = Guid.NewGuid();
                long Seq = updateParams.ExternalIntelligence.Seq;

                /**檔案轉存 (目前不確定檔案格式，先做資料庫轉換)*/
                IFileListRepository fileListRepository = new FileListRepository(_dbConnectionFactory, _departmentInfo.ConnectionName);

                IEnumerable<FileList> fileList = fileListRepository.QuerySearch(new { Seq });

                IEnumerable<IntelligenceFilelist> intelligenceFilelists = fileList.Select(file =>
                {
                    var newFileData = fileHelper.GenNewFileData(file.FileName);

                    return new IntelligenceFilelist()
                    {
                        //IntelligenceFileId = Guid.Parse(newFileData.FileId),
                        IntelligenceCaseId = IntelligenceCaseId,
                        OriginFileName = file.FileName,
                        OriginFilePath = file.FilePath,
                        NewFileName = newFileData.FileName,
                        NewFilePath = newFileData.FilePath,
                        UserUploadType = (int)UserUploadType.OriginalSource,
                        //CreatePersonId = null,
                        //CreateIP = null,
                        CreateTime = DateTime.Now,
                      
                    };
                });
                _unitOfWork.GetRepository<IntelligenceFilelist>().Insert(intelligenceFilelists, _unitOfWork);

                /**嫌疑人資料轉存*/
                IFileObjPersonRepository fileObjPersonRepository = new FileObjPersonRepository(_dbConnectionFactory, _departmentInfo.ConnectionName);
                IEnumerable<FileObjPerson> Suspects = fileObjPersonRepository.QuerySearch(new { Seq });
                var mainSuspectId = Guid.NewGuid();
                IEnumerable<ObjPerson> objPeople = Suspects.Select(person =>
                {
                    return new ObjPerson()
                    {
                        ObjPersonId = person.PersonID == updateParams.CaseDistribute.MainSuspectId ? mainSuspectId: new Guid(),
                        IntelligenceCaseId = IntelligenceCaseId,
                        PersonTitle = person.PersonTitle,
                        PersonName = person.PersonName,
                        PersonID = person.PersonID,
                        IsMainSuspect = person.PersonID == updateParams.CaseDistribute.MainSuspectId,
                        CreateTime = DateTime.Now,
                    };
                });
                var count = _unitOfWork.GetRepository<ObjPerson>().Insert(objPeople, _unitOfWork);


                /**案件資料*/
                CaseManagement caseManagement = new CaseManagement()
                {
                    IntelligenceCaseId = IntelligenceCaseId,
                    ItlgSrcUnitCode = ((int)Department).ToString(),
                    ItlgSrcNo = updateParams.ExternalIntelligence.Seq.ToString(),
                    ItlgSrcCreateTime = updateParams.ExternalIntelligence.CreateTime,
                    ItlgSrcSupervisorId = updateParams.ExternalIntelligence.Supervisor,
                    ItlgSrcSupervisorName = updateParams.ExternalIntelligence.SupervisorName,
                    ItlgSrcFileNo = updateParams.ExternalIntelligence.FileNo,
                    ItlgSrcCaseNo = updateParams.ExternalIntelligence.CaseNo,
                    ItlgSrcCaseName = updateParams.ExternalIntelligence.CaseName,
                    ItlgSrcCreateFileDate = dateTimeHelper.ConvertStringToTimestamp(updateParams.ExternalIntelligence.CreateFileDate),
                    /** 之後會塞原始資料*/
                    /** ItlgSrcCreateFileDate = updateParams.ExternalIntelligence.CreateFileDate,*/
                    ItlgSrcCaseAbstract = updateParams.ExternalIntelligence.CaseAbstract,
                    ItlgSrcReportUnitCode = updateParams.ExternalIntelligence.ReportUnitCode,
                    ItlgSrcTransReportPersonId = updateParams.ExternalIntelligence.TransReportPersonId,
                    ItlgSrcReportNumber = updateParams.ExternalIntelligence.ReportNumber,
                    ItlgSrcNumber = updateParams.ExternalIntelligence.SrcNumber,
                    IntelligenceNo = IntelligenceNo,
                    /**分案資訊*/
                    CaseDistributeUnit = updateParams.CaseDistribute.CaseDistributeUnit,
                    CaseCategory = updateParams.CaseDistribute.CaseCategory,
                    ObjectCategory = updateParams.CaseDistribute.ObjectCategory,
                    SupervisorDepartment = updateParams.CaseDistribute.SupervisorDepartment,
                    SupervisorId = updateParams.CaseDistribute.SupervisorId,
                    ObjPersonId = mainSuspectId,
                    CreateTime = DateTime.Now,
                };
                _unitOfWork.GetRepository<CaseManagement>().Insert(caseManagement, _unitOfWork);
                _unitOfWork.Commit();
                return Ok();
            }
            catch (OperationalException ex)
            {
                _unitOfWork.RollBack();
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }
    }
}
