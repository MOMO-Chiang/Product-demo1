using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Entities
{
    [Table("SystemUnitRespPerson")]
    public class SystemUnitRespPerson
    {

        /// <summary>
        ///流水號
        /// </summary>
        [Key]
        public long Seq { get; set; } //(bigint, not null)

        /// <summary>
        ///系統管理員單位代碼
        /// </summary>
        public string SystemPlatformUnitCode { get; set; } //((nvarchar(10)), not null)

        public string SystemPlatformUnitName { get; set; }

        /// <summary>
        ///單位代碼(轄區)
        /// </summary>
        public string UnitCode { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///單位名稱
        /// </summary>
        public string UnitName { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///局承辦人-1
        /// </summary>
        public string ResponsiblePerson1 { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///局承辦人-2
        /// </summary>
        public string ResponsiblePerson2 { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///局承辦人-3
        /// </summary>
        public string ResponsiblePerson3 { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///最後異動人員帳號
        /// </summary>
        public string UpdateUserId { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///最後異動人員名稱
        /// </summary>
        public string UpdateUserName { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///最後異動時間
        /// </summary>
        public DateTime? UpdateTime { get; set; } //(datetime, null)

        /// <summary>
        ///資料建立人事五碼
        /// </summary>
        public string CreatePersonId { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///資料建立者IP
        /// </summary>
        public string CreateIP { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料建立時間
        /// </summary>
        [Key]
        public DateTime CreateTime { get; set; } //(datetime, not null)
    }
}
