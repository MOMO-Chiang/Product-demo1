using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Models
{
    /// <summary>
    /// 取得專案情資來源件數統計 SearchModel
    /// </summary>
    public class RptIntelligenceSourceListSearchModel
    {
        /// <summary>
        ///提報日期(起)
        /// </summary>
        public DateTime? SetFileStartDate { get; set; }

        /// <summary>
        ///提報日期(訖)
        /// </summary>
        public DateTime? SetFileEndDate { get; set; }

        /// <summary>
        ///案件類別
        /// </summary>
        public string CaseType { get; set; }
    }

    /// <summary>
    /// 取得專案情資來源件數統計 傳給前端的 Model 格式
    /// </summary>
    public class RptIntelligenceSourceListModel
    {
        /// <summary>
        /// 單位 (代碼)
        /// </summary>
        public string UnitCode { get; set; }

        /// <summary>
        /// 單位 (中文名稱)
        /// </summary>
        public string UnitName { get; set; }

        /// <summary>
        /// 總件數
        /// </summary>
        public string TotalCount { get; set; }
    }
}
