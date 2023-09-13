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
using Org.BouncyCastle.Ocsp;
using AutoMapper;
using NPOI.SS.Formula.Functions;
using System.Net.Http.Headers;

namespace IntelligenceOfillegal.Web.Controllers
{
    [RoutePrefix("api/casemanagement")]
    public class CaseManagementController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CaseManagementController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        JsonSerializerSettings settings = new JsonSerializerSettings
        {
            NullValueHandling = NullValueHandling.Ignore,
            MissingMemberHandling = MissingMemberHandling.Ignore
        };

        string createIP = HttpContext.Current.Request.UserHostAddress;
        /// <summary>
        /// 取得情資管理列表
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult Get([FromUri] CaseManagementQueryParams queryParams)
        {

            var queryModel = new CaseManagementSearchModel
            {
                CaseCategory = queryParams.CaseCategory,
                IntelligenceNo = queryParams.IntelligenceNo,
                InvestigateProgressCode = queryParams.InvestigateProgressCode,
                ItlgSrcCaseName = queryParams.ItlgSrcCaseName,
                MainSuspectName = queryParams.MainSuspectName,
                ItlgSrcReportUnitCode = queryParams.ItlgSrcReportUnitCode,
                CreateTimeStart = queryParams.CreateTimeStart,
                CreateTimeEnd = queryParams.CreateTimeEnd,
                Key = queryParams.Key,
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
                Tuple<IEnumerable<CaseManagement>, int> tuple = _unitOfWork.CaseManagementRepository.SearchPaginated(queryModel, paginated);
                IEnumerable<CaseManagement> caseManagementLists = tuple.Item1;

                //caseManagementLists.ToList().ForEach(list => {
                //    list.CreateTime = ConvertToDateString(list.CreateTime);
                //});
                var totalCount = tuple.Item2;
                PaginatedResult<CaseManagementTableDTO> pageResult = new PaginatedResult<CaseManagementTableDTO>
                {
                    PaginatedInfo = new PaginatedInfo
                    {
                        Page = paginated.Page,
                        PageSize = paginated.PageSize,
                        TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                        PageCount = caseManagementLists.Count(),
                        TotalCount = totalCount
                    },
                    Data = _mapper.Map<List<CaseManagement>, List<CaseManagementTableDTO>>(caseManagementLists.ToList())
                };

                return Ok(pageResult);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 產生情資管理
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("create")]
        public IHttpActionResult Create()
        {
            try
            {
                CaseManagement caseManagement = new CaseManagement();
                caseManagement.IntelligenceCaseId = Guid.NewGuid();
                caseManagement.IntelligenceNo = GenIntelligenceNo();
                caseManagement.UpdateTime = DateTime.Now;
                caseManagement.CreateTime = DateTime.Now;

                var seq = _unitOfWork.CaseManagementRepository.Insert(caseManagement);

                return Ok(seq);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 取得單一情資管理
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{seq}")]
        public IHttpActionResult Get(string seq)
        {
            try
            {
                CaseManagement caseManagement = _unitOfWork.CaseManagementRepository.GetBySeq(seq);

                if (caseManagement == null)
                {
                    throw new OperationalException(ErrorType.INVALID_OPERATION, "查無此不法情資編號");
                }

                CaseCaseManagementEditModel caseCaseManagementEditModel = new CaseCaseManagementEditModel();

                //情資案件
                caseCaseManagementEditModel.CaseManagement = _mapper.Map<CaseManagement, CaseManagementEditDTO>(caseManagement);

                //承辦人情資案件
                caseCaseManagementEditModel.SupervisorCaseManagement = _mapper.Map<SupervisorCaseManagement, SupervisorCaseManagementDTO>(new SupervisorCaseManagement()
                {
                    IntelligenceNo = caseManagement.IntelligenceNo,
                    InvestigateProgressCode = caseManagement.InvestigateProgressCode,
                    AssignInvestigateDate = caseManagement.AssignInvestigateDate,
                    ReCheckDate = caseManagement.ReCheckDate,
                    MainCaseIntelligenceNumber = caseManagement.MainCaseIntelligenceNumber,
                    Remark = caseManagement.Remark,
                    CaseAdminNumber = caseManagement.CaseAdminNumber,
                    MainCaseType = caseManagement.MainCaseType,
                    SubCaseType = caseManagement.SubCaseType,
                });

                //主對象列表
                caseCaseManagementEditModel.ObjPersons = _mapper.Map<List<ObjPerson>, List<ObjPersonDTO>>(_unitOfWork.ObjPersonRepository.GetByIntelligenceCaseId(caseManagement.IntelligenceCaseId.ToString()));

                //所有檔案上傳清單
                List<IntelligenceFilelist> allFilelists = _unitOfWork.IntelligenceFilelistRepository.GetByIntelligenceCaseId(caseManagement.IntelligenceCaseId.ToString());

                caseCaseManagementEditModel.UploadFileLists = _mapper.Map<List<IntelligenceFilelist>, List<IntelligenceFilelistDTO>>(allFilelists.Where(x => x.UserUploadType == 1).ToList());
                caseCaseManagementEditModel.SupervisorUploadFileLists = _mapper.Map<List<IntelligenceFilelist>, List<IntelligenceFilelistDTO>>(allFilelists.Where(x => x.UserUploadType == 2).ToList());
                caseCaseManagementEditModel.DownloadFileLists = allFilelists.Where(x => x.UserUploadType == 0).ToList();

                return Ok(caseCaseManagementEditModel);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 刪除情資管理列表
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("delete/{seq}")]
        public IHttpActionResult Delete(string seq)
        {
            try
            {
                _unitOfWork.CaseManagementRepository.DeletedCaseManagement("t0030", seq);
                return Ok();
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 編輯情資管理資料
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("update")]
        public IHttpActionResult Update()
        {
            try
            {
                var currentReq = HttpContext.Current.Request;

                CaseManagementUpdateParams queryParams = new CaseManagementUpdateParams()
                {
                    CaseManagement = Newtonsoft.Json.JsonConvert.DeserializeObject<CaseManagement>(currentReq.Form["CaseManagement"], settings),
                    ObjPersons = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ObjPerson>>(currentReq.Form["ObjPersons"], settings),
                    UploadFileLists = Newtonsoft.Json.JsonConvert.DeserializeObject<List<IntelligenceFilelist>>(currentReq.Form["UploadFileLists"], settings),
                };

                CaseManagement caseManagement = _unitOfWork.CaseManagementRepository.GetByIntelligenceNo(queryParams.CaseManagement.IntelligenceNo);

                if (caseManagement == null)
                {
                    throw new OperationalException(ErrorType.INVALID_OPERATION, "查無此不法情資編號(請先儲存案件情資)");
                }

                //當前情資所有檔案上傳清單
                List<IntelligenceFilelist> currentFilelists = _unitOfWork.IntelligenceFilelistRepository.GetByIntelligenceCaseId(caseManagement.IntelligenceCaseId.ToString()).Where(x => x.UserUploadType == 1).ToList();
                //當前情資所有對象清單
                List<ObjPerson> currentObjPersons = _unitOfWork.ObjPersonRepository.GetByIntelligenceCaseId(caseManagement.IntelligenceCaseId.ToString()).ToList();

                _unitOfWork.BeginTransaction();

                #region 處理案件情資
                caseManagement.ItlgSrcUnitCode = queryParams.CaseManagement.ItlgSrcUnitCode;
                caseManagement.ItlgSrcNo = queryParams.CaseManagement.ItlgSrcNo;
                caseManagement.ObjectCategory = queryParams.CaseManagement.ObjectCategory;
                caseManagement.CreateTime = queryParams.CaseManagement.CreateTime;
                caseManagement.ReceiveReportNum = queryParams.CaseManagement.ReceiveReportNum;
                caseManagement.ItlgSrcReportUnitCode = queryParams.CaseManagement.ItlgSrcReportUnitCode;
                caseManagement.ItlgSrcReportNumber = queryParams.CaseManagement.ItlgSrcReportNumber;
                caseManagement.ItlgSrcTransReportPersonId = queryParams.CaseManagement.ItlgSrcTransReportPersonId;
                caseManagement.ItlgInvolvedAgencyCode = queryParams.CaseManagement.ItlgInvolvedAgencyCode;
                caseManagement.MainSuspectName = queryParams.CaseManagement.MainSuspectName;
                caseManagement.MainSuspectId = queryParams.CaseManagement.MainSuspectId;
                caseManagement.CaseCategory = queryParams.CaseManagement.CaseCategory;
                caseManagement.SupervisorDepartment = queryParams.CaseManagement.SupervisorDepartment;
                caseManagement.ItlgSrcSupervisorName = queryParams.CaseManagement.ItlgSrcSupervisorName;
                caseManagement.ItlgSrcSupervisorId = queryParams.CaseManagement.ItlgSrcSupervisorId;
                caseManagement.MainSuspectRole = queryParams.CaseManagement.MainSuspectRole;
                caseManagement.ItlgSrcCaseName = queryParams.CaseManagement.ItlgSrcCaseName;
                caseManagement.ItlgSrcCaseAbstract = queryParams.CaseManagement.ItlgSrcCaseAbstract;
                caseManagement.CaseDistributeUnit = queryParams.CaseManagement.CaseDistributeUnit;
                caseManagement.ItlgSrcCreateFileDate = queryParams.CaseManagement.ItlgSrcCreateFileDate;
                caseManagement.ItlgSrcNumber = queryParams.CaseManagement.ItlgSrcNumber;
                caseManagement.UpdateUser = "t0030";
                caseManagement.UpdateTime = DateTime.Now;

                _unitOfWork.GetRepository<CaseManagement>().Update(caseManagement, _unitOfWork);
                #endregion

                #region 處理對象清單
                //刪除
                List<ObjPerson> deletedExistObjPersons = currentObjPersons.Where(x => !queryParams.ObjPersons.Any(y => y.ObjPersonId == x.ObjPersonId)).ToList();
                deletedExistObjPersons.ForEach(x =>
                {
                    _unitOfWork.ObjPersonRepository.DeletedObjPerson("t0030", x.ObjPersonId.ToString(), _unitOfWork);
                });

                //編輯
                List<ObjPerson> updateExistObjPersons = queryParams.ObjPersons.Where(x => currentObjPersons.Any(y => y.ObjPersonId == x.ObjPersonId)).ToList();
                updateExistObjPersons.ForEach(x =>
                {
                    x.IntelligenceCaseId = caseManagement.IntelligenceCaseId;
                    x.CreateIP = createIP;
                    x.UpdateTime = DateTime.Now;
                    x.UpdatePersonId = "t0030";
                    _unitOfWork.ObjPersonRepository.Update(x, _unitOfWork);
                });

                //新增
                List<ObjPerson> createObjPersons = queryParams.ObjPersons.Where(x => !currentObjPersons.Any(y => y.ObjPersonId == x.ObjPersonId)).ToList();
                createObjPersons.ForEach(x =>
                {
                    x.IntelligenceCaseId = caseManagement.IntelligenceCaseId;
                    x.CreateIP = createIP;
                    _unitOfWork.GetRepository<ObjPerson>().Insert(x, _unitOfWork);
                });
                #endregion

                #region 處理上傳檔案
                if (!Directory.Exists(ConfigurationManager.AppSettings["FilePath"])) Directory.CreateDirectory(ConfigurationManager.AppSettings["FilePath"]);
                if (currentReq.Files.Count > 0)
                {
                    for (var x = 0; x < currentReq.Files.Count; x++)
                    {
                        var data = queryParams.UploadFileLists.Where(y => y.OriginFileName == currentReq.Files[x].FileName).FirstOrDefault();
                        Guid fileId = Guid.NewGuid();
                        string newFileName = "";
                        int lastDotIndex = data.OriginFileName.LastIndexOf('.');
                        if (lastDotIndex >= 0)
                        {
                            string extension = data.OriginFileName.Substring(lastDotIndex);
                            string fileNameWithoutExtension = data.OriginFileName.Substring(0, lastDotIndex);
                            newFileName = $"{fileId}{extension}";
                        }
                        string filePath = $@"{ConfigurationManager.AppSettings["FilePath"]}\{newFileName}";
                        data.IntelligenceFileId = fileId;
                        data.IntelligenceCaseId = caseManagement.IntelligenceCaseId;
                        data.OriginFilePath = "";
                        data.NewFileName = newFileName;
                        data.NewFilePath = filePath;
                        data.CreateIP = createIP;
                        data.CreateTime = DateTime.Now;

                        //儲存實體檔案
                        currentReq.Files[x].SaveAs(filePath);
                        _unitOfWork.GetRepository<IntelligenceFilelist>().Insert(data, _unitOfWork);
                    };
                }

                if (currentFilelists.Count > 0)
                {
                    List<IntelligenceFilelist> deletedExistFiles = currentFilelists.Where(x => !queryParams.UploadFileLists.Any(y => y.IntelligenceFileId == x.IntelligenceFileId)).ToList();
                    deletedExistFiles.ForEach(x =>
                    {
                        _unitOfWork.IntelligenceFilelistRepository.DeletedIntelligenceFile("t0030", x.IntelligenceFileId.ToString(), _unitOfWork);
                    });
                }
                #endregion
                _unitOfWork.Commit();
                return Ok();
            }
            catch (OperationalException ex)
            {
                _unitOfWork.RollBack();
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }


        /// <summary>
        /// 承辦人編輯情資管理資料
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("updatesupervisor")]
        public IHttpActionResult SupervisorUpdate()
        {
            try
            {
                var currentReq = HttpContext.Current.Request;

                SupervisorUpdateParams queryParams = new SupervisorUpdateParams()
                {
                    SupervisorCaseManagement = Newtonsoft.Json.JsonConvert.DeserializeObject<SupervisorCaseManagement>(currentReq.Form["SupervisorCaseManagement"], settings),
                    UploadFileLists = Newtonsoft.Json.JsonConvert.DeserializeObject<List<IntelligenceFilelist>>(currentReq.Form["UploadFileLists"], settings),
                };

                CaseManagement caseManagement = _unitOfWork.CaseManagementRepository.GetByIntelligenceNo(queryParams.SupervisorCaseManagement.IntelligenceNo);

                if (caseManagement == null)
                {
                    throw new OperationalException(ErrorType.INVALID_OPERATION, "查無此不法情資編號(請先儲存案件情資)");
                }

                //當前情資所有檔案上傳清單
                List<IntelligenceFilelist> currentFilelists = _unitOfWork.IntelligenceFilelistRepository.GetByIntelligenceCaseId(caseManagement.IntelligenceCaseId.ToString()).Where(x => x.UserUploadType == 2).ToList();

                _unitOfWork.BeginTransaction();

                #region 處理承辦人案件情資
                caseManagement.InvestigateProgressCode = queryParams.SupervisorCaseManagement.InvestigateProgressCode;
                caseManagement.AssignInvestigateDate = queryParams.SupervisorCaseManagement.AssignInvestigateDate;
                caseManagement.ReCheckDate = queryParams.SupervisorCaseManagement.ReCheckDate;
                caseManagement.MainCaseIntelligenceNumber = queryParams.SupervisorCaseManagement.MainCaseIntelligenceNumber;
                caseManagement.Remark = queryParams.SupervisorCaseManagement.Remark;
                caseManagement.CaseAdminNumber = queryParams.SupervisorCaseManagement.CaseAdminNumber;
                caseManagement.MainCaseType = queryParams.SupervisorCaseManagement.MainCaseType;
                caseManagement.SubCaseType = queryParams.SupervisorCaseManagement.SubCaseType;
                caseManagement.UpdateUser = "t0030";
                caseManagement.UpdateTime = DateTime.Now;

                _unitOfWork.GetRepository<CaseManagement>().Update(caseManagement, _unitOfWork);
                #endregion

                #region 處理上傳檔案
                if (!Directory.Exists(ConfigurationManager.AppSettings["FilePath"])) Directory.CreateDirectory(ConfigurationManager.AppSettings["FilePath"]);

                if (currentReq.Files.Count > 0)
                {
                    for (var x = 0; x < currentReq.Files.Count; x++)
                    {
                        var data = queryParams.UploadFileLists.Where(y => y.OriginFileName == currentReq.Files[x].FileName).FirstOrDefault();
                        Guid fileId = Guid.NewGuid();
                        string newFileName = "";
                        int lastDotIndex = data.OriginFileName.LastIndexOf('.');
                        if (lastDotIndex >= 0)
                        {
                            string extension = data.OriginFileName.Substring(lastDotIndex);
                            string fileNameWithoutExtension = data.OriginFileName.Substring(0, lastDotIndex);
                            newFileName = $"{fileId}{extension}";
                        }
                        string filePath = $@"{ConfigurationManager.AppSettings["FilePath"]}\{newFileName}";
                        data.IntelligenceFileId = fileId;
                        data.IntelligenceCaseId = caseManagement.IntelligenceCaseId;
                        data.OriginFilePath = "";
                        data.NewFileName = newFileName;
                        data.NewFilePath = filePath;
                        data.CreateIP = createIP;
                        data.CreateTime = DateTime.Now;

                        //儲存實體檔案
                        currentReq.Files[x].SaveAs(filePath);
                        _unitOfWork.GetRepository<IntelligenceFilelist>().Insert(data, _unitOfWork);
                    };
                }

                if (currentFilelists.Count > 0)
                {
                    List<IntelligenceFilelist> deletedExistFiles = currentFilelists.Where(x => !queryParams.UploadFileLists.Any(y => y.IntelligenceFileId == x.IntelligenceFileId)).ToList();
                    deletedExistFiles.ForEach(x =>
                    {
                        _unitOfWork.IntelligenceFilelistRepository.DeletedIntelligenceFile("t0030", x.IntelligenceFileId.ToString(), _unitOfWork);
                    });
                }
                #endregion
                _unitOfWork.Commit();
                return Ok();
            }
            catch (OperationalException ex)
            {
                _unitOfWork.RollBack();
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 取得情資管理頁面下拉選單
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("selectoptions")]
        public IHttpActionResult GetSelectOptions()
        {

            try
            {
                CaseManagementSelectOptions caseManagementSelectOptions = new CaseManagementSelectOptions();
                caseManagementSelectOptions.ItlgSrcUnitCodeSelectOptions = _unitOfWork.EnumerationValueRepository.GetSelectOptions("SourceFrom");
                caseManagementSelectOptions.ObjectCategorySelectOptions = _unitOfWork.EnumerationValueRepository.GetSelectOptions("NotObjType");
                caseManagementSelectOptions.UnitCodeSelectOptions = _unitOfWork.EnumerationValueRepository.GetSelectOptions("MjibMGR_br");
                caseManagementSelectOptions.CaseCategorySelectOptions = _unitOfWork.EnumerationValueRepository.GetSelectOptions("CaseCategory");
                caseManagementSelectOptions.SupervisorDepartmentSelectOptions = _unitOfWork.EnumerationValueRepository.GetSelectOptions("MjibMGR_br").ToList();
                caseManagementSelectOptions.MainSuspectRoleSelectOptions = _unitOfWork.EnumerationValueRepository.GetSelectOptions("NotObjTitle");
                caseManagementSelectOptions.MainCaseTypeSelectOptions = _unitOfWork.EnumerationValueRepository.GetSelectOptions("CaseType104_A");
                caseManagementSelectOptions.SubCaseTypeSelectOptions = _unitOfWork.EnumerationValueRepository.GetSelectOptions("CaseType104_B").ToList();
                caseManagementSelectOptions.InvestigateProgressSelectOptions = _unitOfWork.EnumerationValueRepository.GetSelectOptions("DetectStep").ToList();
                caseManagementSelectOptions.SupervisorSelectOptions = new List<SelectOptions>
                {
                     new SelectOptions { Value = "45123", Text = "梁天賜" },
                     new SelectOptions { Value = "53090", Text = "張測試" },
                     new SelectOptions { Value = "11001", Text = "陳測試" }
                };

                return Ok(caseManagementSelectOptions);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 下載附加檔案
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("download/{id}")]
        public IHttpActionResult Download(string id)
        {
            try
            {
                IntelligenceFilelist intelligenceFilelist = _unitOfWork.IntelligenceFilelistRepository.GetByIntelligenceFileId(id);

                string filePath = Path.Combine(ConfigurationManager.AppSettings["FilePath"], intelligenceFilelist.NewFileName);

                if (System.IO.File.Exists(filePath))
                {
                    var stream = new MemoryStream();

                    using (var fs = new FileStream(filePath, FileMode.Open))
                    {
                        fs.CopyTo(stream);
                    }

                    var res = new HttpResponseMessage(HttpStatusCode.OK)
                    {
                        Content = new ByteArrayContent(stream.ToArray())
                    };

                    res.Content.Headers.ContentDisposition =
                        new ContentDispositionHeaderValue("attachment")
                        {
                            FileName = HttpUtility.UrlEncode(intelligenceFilelist.OriginFileName)
                        };

                    return ResponseMessage(res);
                }
                else
                {
                    throw new OperationalException(ErrorType.INVALID_OPERATION, "找不到原始檔案");
                }
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 取得情資轉移歷程
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("casemanagementtransferhistory/{intelligencecaseid}")]
        public IHttpActionResult GetCaseManagementTransferHistory(string intelligencecaseid)
        {
            try
            {
                List<CaseManagementTransferHistory> caseManagementTransferHistorys = _unitOfWork.CaseManagementTransferHistoryRepository.GetByIntelligenceCaseId(intelligencecaseid);

                var result = _mapper.Map<List<CaseManagementTransferHistory>, List<CaseManagementTransferHistoryDTO>>(caseManagementTransferHistorys.OrderByDescending(x => x.UpdateTime).ToList());

                return Ok(result);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 新增情資轉移歷程
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("casemanagementtransferhistory/create")]
        public IHttpActionResult CreateCaseManagementTransferHistory(CaseManagementTransferHistoryCreateParams createParams)
        {
            try
            {
                CaseManagement caseManagement = _unitOfWork.CaseManagementRepository.GetByIntelligenceCaseId(createParams.IntelligenceCaseId);
                string originPersonId = caseManagement.ItlgSrcSupervisorId;

                if (originPersonId == createParams.NewPersonId)
                {
                    throw new OperationalException(ErrorType.INVALID_OPERATION, "與原始轉移承辦人相同");
                }
                _unitOfWork.BeginTransaction();

                #region 更新案件情資承辦人
                caseManagement.ItlgSrcSupervisorId = createParams.NewPersonId;
                caseManagement.ItlgSrcSupervisorName = createParams.NewPersonName;

                _unitOfWork.GetRepository<CaseManagement>().Update(caseManagement, _unitOfWork);
                #endregion

                #region 新增情資轉移歷程
                CaseManagementTransferHistory caseManagementTransferHistory = new CaseManagementTransferHistory();
                caseManagementTransferHistory.OriginPersonId = originPersonId;
                caseManagementTransferHistory.NewPersonId = createParams.NewPersonId;
                caseManagementTransferHistory.UpdateUser = "t0030";
                caseManagementTransferHistory.IntelligenceCaseId = caseManagement.IntelligenceCaseId;
                caseManagementTransferHistory.CreateIP = createIP;
                caseManagementTransferHistory.UpdateTime = DateTime.Now;
                _unitOfWork.GetRepository<CaseManagementTransferHistory>().Insert(caseManagementTransferHistory, _unitOfWork);
                #endregion

                _unitOfWork.Commit();
                return Ok();
            }
            catch (OperationalException ex)
            {
                _unitOfWork.RollBack();
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 對象姓名比對結果
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("suspectnamecollision/{mainsuspectname}")]
        public IHttpActionResult MainSuspectNameCollision(string mainsuspectname)
        {
            try
            {
                List<CaseManagement> caseManagementLists = _unitOfWork.CaseManagementRepository.GetBySuspectName(mainsuspectname);

                var result = _mapper.Map<List<CaseManagement>, List<CaseManagementTableDTO>>(caseManagementLists);

                return Ok(result);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 產生不法情資編號
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("intelligenceno")]
        public string GenIntelligenceNo()
        {
            return "MJIB-" + Guid.NewGuid().ToString();
        }
    }
}
