using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Models
{
    /// <summary>
    /// 取得經防處國情處理報表資料 SearchModel
    /// </summary>
    public class RptEconomyItlgListSearchModel
    {
        /// <summary>
        ///建檔日期(起)(原收文日期)
        /// </summary>
        public DateTime? SetFileStartDate { get; set; }

        /// <summary>
        ///建檔日期(迄)(原收文日期)
        /// </summary>
        public DateTime? SetFileEndDate { get; set; }

        /// <summary>
        ///來文單位
        /// </summary>
        public string ItlgSrcReportUnitName { get; set; }
    }

    /// <summary>
    /// 取得經防處國情處理報表資料 傳給前端的 Model 格式
    /// </summary>
    public class RptEconomyItlgListModel
    {
        /// <summary>
        /// 國情文號
        /// </summary>
        public string ItlgSrcFileNo { get; set; }

        /// <summary>
        /// 收文日期
        /// </summary>
        public string ItlgSrcCreateFileDate { get; set; }

        /// <summary>
        /// 新流水號
        /// </summary>
        public string IntelligenceNo { get; set; }

        /// <summary>
        /// 主旨
        /// </summary>
        public string ItlgSrcCaseName { get; set; }

        /// <summary>
        /// 主承辦人
        /// </summary>
        public string ItlgSrcSupervisorId { get; set; }

        /// <summary>
        /// 業務承辦人
        /// </summary>
        public string SupervisorId { get; set; }

        /// <summary>
        /// 案件狀態 (代碼)
        /// </summary>
        public string InvestigateProgressCode { get; set; }

        /// <summary>
        /// 案件狀態 (中文名稱)
        /// </summary>
        public string InvestigateProgressName { get; set; }

        /// <summary>
        /// 公文號
        /// </summary>
        public string ReceiveReportNum { get; set; }

        /// <summary>
        ///來文單位 (代碼)
        /// </summary>
        public string ItlgSrcReportUnitCode { get; set; }

        /// <summary>
        ///來文單位 (中文名稱)
        /// </summary>
        public string ItlgSrcReportUnitName { get; set; }

        /// <summary>
        ///外勤單位 (代碼)
        /// </summary>
        public string CaseDistributeUnit { get; set; }

        /// <summary>
        ///外勤單位 (中文名稱)
        /// </summary>
        public string CaseDistributeUnitName { get; set; }
    }
}
