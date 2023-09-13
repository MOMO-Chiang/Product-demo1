using IntelligenceOfillegal.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Models
{
    public class RptIncorruptionItlgListQueryParams : PaginationWithSortedQueryModel
    {
        /// <summary>
        ///提報日期(起)
        /// </summary>
        public string SetFileStartDate { get; set; }

        /// <summary>
        ///提報日期(訖)
        /// </summary>
        public string SetFileEndDate { get; set; }

        /// <summary>
        ///提報單位
        /// </summary>
        public string ItlgSrcReportUnitName { get; set; }
    }

}