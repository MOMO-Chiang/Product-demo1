using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Models
{
    /// <summary>
    /// 取得廉政處提報單位統計表 SearchModel
    /// </summary>
    public class RptUnitsProcStatusListSearchModel
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
    /// 取得廉政處提報單位統計表 傳給前端的 Model 格式
    /// </summary>
    public class RptUnitsProcStatusListModel
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

        /// <summary>
        /// 簽辦中
        /// </summary>
        public string UnderSigning { get; set; }

        /// <summary>
        /// 發交外勤
        /// </summary>
        public string AssignToFieldwork { get; set; }

        /// <summary>
        /// 發查
        /// </summary>
        public string AssignToInvestigation { get; set; }

        /// <summary>
        /// 存查
        /// </summary>
        public string FileForReference { get; set; }

        /// <summary>
        /// 併案
        /// </summary>
        public string MergeCase { get; set; }

        /// <summary>
        /// 協查
        /// </summary>
        public string AssistToInvestigation { get; set; }
    }
}
