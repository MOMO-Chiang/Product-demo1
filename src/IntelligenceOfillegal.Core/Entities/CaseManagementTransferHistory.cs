using System;
using System.Collections.Generic;
using System.Linq;
using Dapper.Contrib.Extensions;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Entities
{
    [Table("CaseManagementTransferHistory")]
    public class CaseManagementTransferHistory
    {
        /// <summary>
        ///流水號
        /// </summary>
        [Key]
        public long Seq { get; set; } //(bigint, not null)
        /// <summary>
        ///原始承辦人五碼
        /// </summary>
        public string OriginPersonId { get; set; } //((nvarchar(10)), null)
        /// <summary>
        ///新承辦人五碼
        /// </summary>
        public string NewPersonId { get; set; } //((nvarchar(10)), null)
        /// <summary>
        ///更新時間
        /// </summary>
        public DateTime UpdateTime { get; set; } //(datetime, null)
        /// <summary>
        ///更新人員
        /// </summary>
        public string UpdateUser { get; set; } //((nvarchar(10)), null)
        /// <summary>
        ///ip
        /// </summary>
        public string CreateIP { get; set; } //((nvarchar(20)), null)
        /// <summary>
        ///情資Id
        /// </summary>
        public Guid IntelligenceCaseId { get; set; } //(uniqueidentifier, null)
    }
}
