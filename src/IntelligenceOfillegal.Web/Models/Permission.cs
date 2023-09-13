using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Models
{
    public class Permission
    {
        /// <summary>
        /// Dashboard
        /// </summary>
        public bool Dashboard { get; set; }

        /// <summary>
        /// 情資案件管理
        /// </summary>
        public bool TestCaseList { get; set; }


        /// <summary>
        /// 外部情資管理-國內處
        /// </summary>
        public bool srcDomestic { get; set; }

        /// <summary>
        /// 外部情資管理-保防處
        /// </summary>
        public bool srcSecure { get; set; }

        /// <summary>
        /// 外部情資管理-洗防處
        /// </summary>
        public bool srcLaundry{ get; set; }

/// <summary>
/// 使用者帳號管理
/// </summary>
public bool SystemUsers { get; set; }

        /// <summary>
        /// 基礎代碼維護
        /// </summary>
        public bool BasicCode { get; set; }
        public bool CaseManagement { get; set; }

        /// <summary>
        /// 統計報表
        /// </summary>
        public bool RptEconomyIntelligence { get; set; }
    }
}