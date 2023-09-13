using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Models
{
    public class CaseManagementQueryParams : PaginationWithSortedQueryModel
    {
        /// <summary>
        ///分案類別
        /// </summary>
        public string CaseCategory { get; set; }

        /// <summary>
        ///不法情資編號
        /// </summary>
        public string IntelligenceNo { get; set; }

        /// <summary>
        ///調查進度
        /// </summary>
        public string InvestigateProgressCode { get; set; }

        /// <summary>
        ///情資來源案名
        /// </summary>
        public string ItlgSrcCaseName { get; set; }

        /// <summary>
        ///主要對象姓名
        /// </summary>
        public string MainSuspectName { get; set; }

        /// <summary>
        ///提報單位
        /// </summary>
        public string ItlgSrcReportUnitCode { get; set; }

        /// <summary>
        ///提報日期(起)
        /// </summary>
        public string CreateTimeStart { get; set; }

        /// <summary>
        ///提報日期(迄)
        /// </summary>
        public string CreateTimeEnd { get; set; }

        /// <summary>
        ///關鍵字
        /// </summary>
        public string Key { get; set; }
    }

    public class SupervisorCaseManagement
    {
        /// <summary>
        ///不法情資編號
        /// </summary>
        public string IntelligenceNo { get; set; }

        /// <summary>
        ///調查進度
        /// </summary>
        public string InvestigateProgressCode { get; set; }

        /// <summary>
        ///發查日期(發給外勤)
        /// </summary>
        public DateTime? AssignInvestigateDate { get; set; }

        /// <summary>
        ///查覆日期
        /// </summary>
        public DateTime? ReCheckDate { get; set; }

        /// <summary>
        ///主案之情資編號(預設代入不法情資編號-分案時產生)
        /// </summary>
        public string MainCaseIntelligenceNumber { get; set; }

        /// <summary>
        ///備註(情資研析)
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        ///案管案號(若該欄位有值,開啟頁面時,要自動從案管取該案件資訊)
        /// </summary>
        public string CaseAdminNumber { get; set; }

        /// <summary>
        ///案件主類別
        /// </summary>
        public string MainCaseType { get; set; }

        /// <summary>
        ///案件次類別
        /// </summary>
        public string SubCaseType { get; set; }
    }

    public class CaseManagementUpdateParams
    {
        /// <summary>
        ///不情資案件管理
        /// </summary>
        public CaseManagement CaseManagement { get; set; }

        /// <summary>
        ///主對象列表
        /// </summary>
        public List<ObjPerson> ObjPersons { get; set; }

        /// <summary>
        ///上傳檔案列表
        /// </summary>
        public List<IntelligenceFilelist> UploadFileLists { get; set; }

    }

    public class SupervisorUpdateParams
    {
        /// <summary>
        ///承辦人新增資案件管理
        /// </summary>
        public SupervisorCaseManagement SupervisorCaseManagement { get; set; }

        /// <summary>
        ///上傳檔案列表
        /// </summary>
        public List<IntelligenceFilelist> UploadFileLists { get; set; }

    }

    public class CaseManagementTransferHistoryCreateParams {
        /// <summary>
        ///新承辦人五碼
        /// </summary>
        public string NewPersonId { get; set; }
        /// <summary>
        ///新承辦人姓名
        /// </summary>
        public string NewPersonName { get; set; }
        /// <summary>
        ///情資Id
        /// </summary>
        public string IntelligenceCaseId { get; set; }
    }

    public class CaseCaseManagementEditModel
    {
        /// <summary>
        ///情資案件
        /// </summary>
        public CaseManagementEditDTO CaseManagement { get; set; }

        /// <summary>
        ///承辦人情資案件
        /// </summary>
        public SupervisorCaseManagementDTO SupervisorCaseManagement { get; set; }

        /// <summary>
        ///主對象列表
        /// </summary>
        public List<ObjPersonDTO> ObjPersons { get; set; }

        /// <summary>
        ///上傳檔案列表
        /// </summary>
        public List<IntelligenceFilelistDTO> UploadFileLists { get; set; }

        /// <summary>
        ///承辦人上傳檔案列表
        /// </summary>
        public List<IntelligenceFilelistDTO> SupervisorUploadFileLists { get; set; }

        /// <summary>
        ///附加檔案列表
        /// </summary>
        public List<IntelligenceFilelist> DownloadFileLists { get; set; }
    }

    public class CaseManagementTableDTO
    {

        /// <summary>
        ///流水號 
        /// </summary>
        public long Seq { get; set; } //(bigint, not null)

        /// <summary>
        ///唯一序號,對應附加檔案及對象清單
        /// </summary>
        public Guid IntelligenceCaseId { get; set; } //(uniqueidentifier, not null)

        /// <summary>
        ///情資來源(單位代碼-國內,保防,洗防)
        /// </summary>
        public string ItlgSrcUnitCode { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///情資來源編號
        /// </summary>
        public string ItlgSrcNo { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///情資來源系統建立日期
        /// </summary>
        public string ItlgSrcCreateTime { get; set; } //(datetime, not null)

        /// <summary>
        ///原始承辦人五碼
        /// </summary>
        public string ItlgSrcSupervisorId { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///原始承辦人姓名
        /// </summary>
        public string ItlgSrcSupervisorName { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///國情文號
        /// </summary>
        public string ItlgSrcFileNo { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///情資來源案號
        /// </summary>
        public string ItlgSrcCaseNo { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///情資來源案名
        /// </summary>
        public string ItlgSrcCaseName { get; set; } //((nvarchar(100)), not null)

        /// <summary>
        ///情資來源建檔日期
        /// </summary>
        public string ItlgSrcCreateFileDate { get; set; } //(datetime, not null)

        /// <summary>
        ///案情摘要
        /// </summary>
        public string ItlgSrcCaseAbstract { get; set; } //((nvarchar(MAX)), not null)

        /// <summary>
        ///提報單位(情資來源下的單位)
        /// </summary>
        public string ItlgSrcReportUnitCode { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///轉報人五碼(洗防處承辦人)
        /// </summary>
        public string ItlgSrcTransReportPersonId { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///原報代號(承辦人五碼???)
        /// </summary>
        public string ItlgSrcReportNumber { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///來源字號
        /// </summary>
        public string ItlgSrcNumber { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///不法情資編號(分案時產生)
        /// </summary>
        public string IntelligenceNo { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///分案單位(25:經防處31:廉政處)由分案人所屬單位決定
        /// </summary>
        public string CaseDistributeUnit { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///分案類別(0:無,1:廉能,2:非廉能)無給經防用
        /// </summary>
        public string CaseCategory { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///對象類別代碼
        /// </summary>
        public string ObjectCategory { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///承辦人單位代碼(科)
        /// </summary>
        public string SupervisorDepartment { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///承辦人人事五碼
        /// </summary>
        public string SupervisorId { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///公文號(從公文系統取得)
        /// </summary>
        public string ReceiveReportNum { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///情資所涉機關代碼
        /// </summary>
        public string ItlgInvolvedAgencyCode { get; set; } //((nvarchar(30)), null)

        /// <summary>
        ///案件主類別代碼
        /// </summary>
        public string MainCaseType { get; set; } //((nvarchar(10)), null)

        /// <summary>
        ///案件次類別代碼
        /// </summary>
        public string SubCaseType { get; set; } //((nvarchar(10)), null)

        /// <summary>
        ///主要對象序號(對應到ObjPerson資料表)
        /// </summary>
        public string ObjPersonId { get; set; } //(uniqueidentifier, null)

        /// <summary>
        ///主對象身分代碼(01公務員...)
        /// </summary>
        public string MainSuspectRole { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///主要對象身分證號 (ui 使用,身分證號比對用)
        /// </summary>
        public string MainSuspectId { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///主要對象姓名 (ui 使用 ,關鍵字查詢或基資比對用)
        /// </summary>
        public string MainSuspectName { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///調查進度代碼
        /// </summary>
        public string InvestigateProgressCode { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///發查日期(發給外勤)
        /// </summary>
        public string AssignInvestigateDate { get; set; } //(datetime, null)

        /// <summary>
        ///查覆日期
        /// </summary>
        public string ReCheckDate { get; set; } //(datetime, null)

        /// <summary>
        ///主案之情資編號(預設代入不法情資編號-分案時產生)
        /// </summary>
        public string MainCaseIntelligenceNumber { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///備註(情資研析)
        /// </summary>
        public string Remark { get; set; } //((nvarchar(MAX)), null)

        /// <summary>
        ///案管案號(若該欄位有值,開啟頁面時,要自動從案管取該案件資訊)
        /// </summary>
        public string CaseAdminNumber { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///提報日期(分案時間)
        /// </summary>
        public string CreateTime { get; set; } //(datetime, not null)
    }

    public class CaseManagementEditDTO
    {

        /// <summary>
        ///流水號 
        /// </summary>
        public long Seq { get; set; } //(bigint, not null)

        /// <summary>
        ///唯一序號,對應附加檔案及對象清單
        /// </summary>
        public Guid IntelligenceCaseId { get; set; } //(uniqueidentifier, not null)

        /// <summary>
        ///情資來源(單位代碼-國內,保防,洗防)
        /// </summary>
        public string ItlgSrcUnitCode { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///情資來源編號
        /// </summary>
        public string ItlgSrcNo { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///情資來源系統建立日期
        /// </summary>
        public string ItlgSrcCreateTime { get; set; } //(datetime, not null)

        /// <summary>
        ///原始承辦人五碼
        /// </summary>
        public string ItlgSrcSupervisorId { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///原始承辦人姓名
        /// </summary>
        public string ItlgSrcSupervisorName { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///國情文號
        /// </summary>
        public string ItlgSrcFileNo { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///情資來源案號
        /// </summary>
        public string ItlgSrcCaseNo { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///情資來源案名
        /// </summary>
        public string ItlgSrcCaseName { get; set; } //((nvarchar(100)), not null)

        /// <summary>
        ///情資來源建檔日期
        /// </summary>
        public string ItlgSrcCreateFileDate { get; set; } //(datetime, not null)

        /// <summary>
        ///案情摘要
        /// </summary>
        public string ItlgSrcCaseAbstract { get; set; } //((nvarchar(MAX)), not null)

        /// <summary>
        ///提報單位(情資來源下的單位)
        /// </summary>
        public string ItlgSrcReportUnitCode { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///轉報人五碼(洗防處承辦人)
        /// </summary>
        public string ItlgSrcTransReportPersonId { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///原報代號(承辦人五碼???)
        /// </summary>
        public string ItlgSrcReportNumber { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///來源字號
        /// </summary>
        public string ItlgSrcNumber { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///不法情資編號(分案時產生)
        /// </summary>
        public string IntelligenceNo { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///分案單位(25:經防處31:廉政處)由分案人所屬單位決定
        /// </summary>
        public string CaseDistributeUnit { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///分案類別(0:無,1:廉能,2:非廉能)無給經防用
        /// </summary>
        public string CaseCategory { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///對象類別代碼
        /// </summary>
        public string ObjectCategory { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///承辦人單位代碼(科)
        /// </summary>
        public string SupervisorDepartment { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///承辦人人事五碼
        /// </summary>
        public string SupervisorId { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///公文號(從公文系統取得)
        /// </summary>
        public string ReceiveReportNum { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///情資所涉機關代碼
        /// </summary>
        public string ItlgInvolvedAgencyCode { get; set; } //((nvarchar(30)), null)

        /// <summary>
        ///案件主類別代碼
        /// </summary>
        public string MainCaseType { get; set; } //((nvarchar(10)), null)

        /// <summary>
        ///案件次類別代碼
        /// </summary>
        public string SubCaseType { get; set; } //((nvarchar(10)), null)

        /// <summary>
        ///主要對象序號(對應到ObjPerson資料表)
        /// </summary>
        public string ObjPersonId { get; set; } //(uniqueidentifier, null)

        /// <summary>
        ///主對象身分代碼(01公務員...)
        /// </summary>
        public string MainSuspectRole { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///主要對象身分證號 (ui 使用,身分證號比對用)
        /// </summary>
        public string MainSuspectId { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///主要對象姓名 (ui 使用 ,關鍵字查詢或基資比對用)
        /// </summary>
        public string MainSuspectName { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///調查進度代碼
        /// </summary>
        public string InvestigateProgressCode { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///發查日期(發給外勤)
        /// </summary>
        public string AssignInvestigateDate { get; set; } //(datetime, null)

        /// <summary>
        ///查覆日期
        /// </summary>
        public string ReCheckDate { get; set; } //(datetime, null)

        /// <summary>
        ///主案之情資編號(預設代入不法情資編號-分案時產生)
        /// </summary>
        public string MainCaseIntelligenceNumber { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///備註(情資研析)
        /// </summary>
        public string Remark { get; set; } //((nvarchar(MAX)), null)

        /// <summary>
        ///案管案號(若該欄位有值,開啟頁面時,要自動從案管取該案件資訊)
        /// </summary>
        public string CaseAdminNumber { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///提報日期(分案時間)
        /// </summary>
        public string CreateTime { get; set; } //(datetime, not null)
    }

    public class ObjPersonDTO
    {

        /// <summary>
        ///流水號
        /// </summary>
        public long Seq { get; set; } //(bigint, not null)

        /// <summary>
        ///對象唯一序號
        /// </summary>
        public Guid ObjPersonId { get; set; } //(uniqueidentifier, not null)

        /// <summary>
        ///對應CaseManagement序號
        /// </summary>
        public Guid IntelligenceCaseId { get; set; } //(uniqueidentifier, not null)

        /// <summary>
        ///對象職稱
        /// </summary>
        public string PersonTitle { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///對象中文名稱
        /// </summary>
        public string PersonName { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///對象統一編號
        /// </summary>
        public string PersonID { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///是否為主要對象
        /// </summary>
        public bool IsMainSuspect { get; set; } //(bit, not null)

        /// <summary>
        ///最後異動人事五碼
        /// </summary>
        public string UpdatePersonId { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///是否提列洗錢勾稽
        /// </summary>
        public bool IsReportLink { get; set; } //(bit, not null)

        /// <summary>
        ///資料建立者人事五碼,系統自動帶入則無
        /// </summary>
        public string CreatePersonId { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料建立者IP
        /// </summary>
        public string CreateIP { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料建立時間
        /// </summary>
        public string CreateTime { get; set; } //(datetime, not null)
    }

    public class IntelligenceFilelistDTO
    {

        /// <summary>
        ///流水號
        /// </summary>
        public long Seq { get; set; } //(bigint, not null)

        /// <summary>
        ///檔案唯一序號
        /// </summary>
        public Guid IntelligenceFileId { get; set; } //(uniqueidentifier, not null)

        /// <summary>
        ///對應CaseManagement序號
        /// </summary>
        public Guid IntelligenceCaseId { get; set; } //(uniqueidentifier, not null)

        /// <summary>
        ///原始檔案名稱
        /// </summary>
        public string OriginFileName { get; set; } //((nvarchar(100)), not null)

        /// <summary>
        ///原始檔案路徑(資料落地前的原始下載連結)
        /// </summary>
        public string OriginFilePath { get; set; } //((nvarchar(300)), not null)

        /// <summary>
        ///新檔案名稱
        /// </summary>
        public string NewFileName { get; set; } //((nvarchar(100)), not null)

        /// <summary>
        ///資料落地後的檔案路徑
        /// </summary>
        public string NewFilePath { get; set; } //((nvarchar(300)), not null)

        /// <summary>
        ///檔案上傳腳色種類(0:原始來源取得1,分案人上傳2.承辦人上傳)
        /// </summary>
        public int UserUploadType { get; set; } //(int, not null)

        /// <summary>
        ///資料建立者人事五碼,系統自動帶入則無
        /// </summary>
        public string CreatePersonId { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料建立者IP
        /// </summary>
        public string CreateIP { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料建立時間
        /// </summary>
        public string CreateTime { get; set; } //(datetime, not null)
    }

    public class SupervisorCaseManagementDTO
    {
        /// <summary>
        ///不法情資編號
        /// </summary>
        public string IntelligenceNo { get; set; }

        /// <summary>
        ///調查進度
        /// </summary>
        public string InvestigateProgressCode { get; set; }

        /// <summary>
        ///發查日期(發給外勤)
        /// </summary>
        public string AssignInvestigateDate { get; set; }

        /// <summary>
        ///查覆日期
        /// </summary>
        public string ReCheckDate { get; set; }

        /// <summary>
        ///主案之情資編號(預設代入不法情資編號-分案時產生)
        /// </summary>
        public string MainCaseIntelligenceNumber { get; set; }

        /// <summary>
        ///備註(情資研析)
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        ///案管案號(若該欄位有值,開啟頁面時,要自動從案管取該案件資訊)
        /// </summary>
        public string CaseAdminNumber { get; set; }

        /// <summary>
        ///案件主類別
        /// </summary>
        public string MainCaseType { get; set; }

        /// <summary>
        ///案件次類別
        /// </summary>
        public string SubCaseType { get; set; }
    }

    public class CaseManagementTransferHistoryDTO
    {
        /// <summary>
        ///流水號
        /// </summary>
        public long Seq { get; set; } //(bigint, not null)
        /// <summary>
        ///原始承辦人五碼
        /// </summary>
        public string OriginPersonId { get; set; } //((nvarchar(10)), null)
        /// <summary>
        ///新承辦人五碼
        /// </summary>
        public string NewPersonId { get; set; } //((nvarchar(10)), null)
        /// <summary>
        ///更新時間
        /// </summary>
        public string UpdateTime { get; set; } //(datetime, null)
        /// <summary>
        ///更新人員
        /// </summary>
        public string UpdateUser { get; set; } //((nvarchar(10)), null)
        /// <summary>
        ///ip
        /// </summary>
        public string CreateIP { get; set; } //((nvarchar(20)), null)
        /// <summary>
        ///情資Id
        /// </summary>
        public string IntelligenceCaseId { get; set; } //(uniqueidentifier, null)
    }
}