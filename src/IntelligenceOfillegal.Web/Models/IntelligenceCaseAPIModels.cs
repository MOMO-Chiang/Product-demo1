using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Models
{
    public class IntelligenceCaseQueryParams : PaginationWithSortedQueryModel
    {
        ///情資編號
        /// </summary>
        public string IntelligenceNo { get; set; } 

        /// <summary>
        ///承辦人姓名(原始來源可能沒有)
        /// </summary>
        public string SupervisorName { get; set; } 
        /// <summary>
        ///國情文號(原單位檔案編號)
        /// </summary>
        public string FileNo { get; set; } 
        /// <summary>
        ///案號
        /// </summary>
        public string CaseNo { get; set; } 
        /// <summary>
        ///案名
        /// </summary>
        public string CaseName { get; set; }
    }

    public class IntelligenceCaseUpdateParams
    {
        public ExternalIntelligence ExternalIntelligence { get; set; }
        public CaseDistributeModel CaseDistribute { get; set; }
    }
}