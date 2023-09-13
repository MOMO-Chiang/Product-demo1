using Dapper.Contrib.Extensions;
using IntelligenceOfillegal.Common.Constants;
using IntelligenceOfillegal.Core.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Models
{

    public class ExternalIntelligenceSearchModel
    {
        /// <summary>
        ///情資編號
        /// </summary>
        [WhereOperator(TSqlOperator.Like)]
        public string IntelligenceNo { get; set; } //((nvarchar(50)), not null)


        /// <summary>
        ///承辦人五碼
        /// </summary>
        [WhereOperator(TSqlOperator.Like)]
        public string Supervisor { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///承辦人姓名(原始來源可能沒有)
        /// </summary>
        [WhereOperator(TSqlOperator.Like)]
        public string SupervisorName { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///國情文號(原單位檔案編號)
        /// </summary>
        [WhereOperator(TSqlOperator.Like)]
        public string FileNo { get; set; } //((nvarchar(50)), null)
        ///案號
        /// </summary>
        [WhereOperator(TSqlOperator.Like)]
        public string CaseNo { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///案名
        /// </summary>
        [WhereOperator(TSqlOperator.Like)]
        public string CaseName { get; set; } //((nvarchar(50)), null)
        /// <summary>

    }
}
