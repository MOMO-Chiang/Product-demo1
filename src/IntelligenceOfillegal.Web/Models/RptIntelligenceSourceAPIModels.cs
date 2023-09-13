﻿using IntelligenceOfillegal.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Models
{
    public class RptIntelligenceSourceListQueryParams : PaginationWithSortedQueryModel
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
        ///案件類別
        /// </summary>
        public string CaseType { get; set; }
    }

}