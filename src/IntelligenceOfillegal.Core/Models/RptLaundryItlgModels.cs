using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Models
{
    /// <summary>
    /// 取得廉政處洗錢處理報表 SearchModel
    /// </summary>
    public class RptLaundryItlgListSearchModel
    {
        /// <summary>
        ///提報日期(起)
        /// </summary>
        public DateTime? SetFileStartDate { get; set; }

        /// <summary>
        ///提報日期(訖)
        /// </summary>
        public DateTime? SetFileEndDate { get; set; }
    }

    /// <summary>
    /// 取得廉政處洗錢處理報表 傳給前端的 Model 格式
    /// </summary>
    public class RptLaundryItlgListModel
    {
        /// <summary>
        /// 項次
        /// </summary>
        public string Seq { get; set; }

        /// <summary>
        /// 來源單位 (代碼)
        /// </summary>
        public string ItlgSrcUnitCode { get; set; }

        /// <summary>
        /// 來源單位 (中文名稱)
        /// </summary>
        public string ItlgSrcUnitName { get; set; }

        /// <summary>
        /// 新流水號
        /// </summary>
        public string IntelligenceNo { get; set; }

        /// <summary>
        /// 分送日期
        /// </summary>
        public string ItlgSrcCreateFileDate { get; set; }

        /// <summary>
        /// 來源字號
        /// </summary>
        public string ItlgSrcFileNo { get; set; }

        /// <summary>
        /// 案件類別 (代碼)
        /// </summary>
        public string MainCaseType { get; set; }

        /// <summary>
        /// 案件類別 (中文名稱)
        /// </summary>
        public string MainCaseTypeName { get; set; }

        /// <summary>
        /// 選舉情資註記
        /// </summary>
        public string ElectionItlgNotes { get; set; }

        /// <summary>
        /// 承辦人
        /// </summary>
        public string ItlgSrcSupervisorId { get; set; }

        /// <summary>
        /// 提報日期
        /// </summary>
        public string CreateTime { get; set; }

        /// <summary>
        /// 公文字號
        /// </summary>
        public string ReceiveReportNum { get; set; }

        /// <summary>
        /// 內容摘要
        /// </summary>
        public string ItlgSrcCaseName { get; set; }

        /// <summary>
        /// 處理情形 (代碼)
        /// </summary>
        public string InvestigateProgressCode { get; set; }

        /// <summary>
        /// 處理情形 (中文名稱)
        /// </summary>
        public string InvestigateProgressName { get; set; }

        /// <summary>
        /// 承辦科 (代碼)
        /// </summary>
        public string SupervisorDepartment { get; set; }

        /// <summary>
        /// 承辦科 (中文名稱)
        /// </summary>
        public string SupervisorDepartmentName { get; set; }
    }
}
