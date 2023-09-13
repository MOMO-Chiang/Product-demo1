using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Entities
{
    [Table("ObjPerson")]
    public class ObjPerson
    {

        /// <summary>
        ///流水號
        /// </summary>
        [Key]
        public long Seq { get; set; } //(bigint, not null)

        /// <summary>
        ///對象唯一序號
        /// </summary>
        [Key]
        public Guid ObjPersonId { get; set; } //(uniqueidentifier, not null)

        /// <summary>
        ///對應CaseManagement序號
        /// </summary>
        public Guid IntelligenceCaseId { get; set; } //(uniqueidentifier, not null)

        /// <summary>
        ///對象職稱
        /// </summary>
        public string PersonTitle { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///對象中文名稱
        /// </summary>
        public string PersonName { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///對象統一編號
        /// </summary>
        public string PersonID { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///是否為主要對象
        /// </summary>
        public bool IsMainSuspect { get; set; } //(bit, not null)

        /// <summary>
        ///最後異動人事五碼
        /// </summary>
        public string UpdatePersonId { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料最後異動時間(提列洗錢勾稽狀態異動時更新時間)
        /// </summary>
        public DateTime? UpdateTime { get; set; } //(datetime, null)

        /// <summary>
        ///是否提列洗錢勾稽
        /// </summary>
        public bool IsReportLink { get; set; } //(bit, not null)

        /// <summary>
        ///資料建立者人事五碼,系統自動帶入則無
        /// </summary>
        public string CreatePersonId { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料建立者IP
        /// </summary>
        public string CreateIP { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; } //(datetime, not null)

        /// <summary>
        ///是否刪除
        /// </summary>
        public bool? DeletedAt { get; set; } //(string, null)
    }
}
