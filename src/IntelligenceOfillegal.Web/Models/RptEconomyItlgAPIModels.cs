using IntelligenceOfillegal.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Models
{
    public class RptEconomyItlgListQueryParams : PaginationWithSortedQueryModel
    {
        /// <summary>
        ///建檔日期(起)
        /// </summary>
        public string SetFileStartDate { get; set; }

        /// <summary>
        ///建檔日期(迄)
        /// </summary>
        public string SetFileEndDate { get; set; }

        /// <summary>
        ///來文單位
        /// </summary>
        public string ItlgSrcReportUnitName { get; set; }
    }

}