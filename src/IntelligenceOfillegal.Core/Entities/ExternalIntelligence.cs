using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Entities
{
    [Table("")]

    public class ExternalIntelligence
    {
        /// <summary>
        /// 
        /// </summary>
        public long Seq { get; set; } //(bigint, not null)
        /// <summary>
        ///情資編號
        /// </summary>
        public string IntelligenceNo { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///承辦人五碼
        /// </summary>
        public string Supervisor { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///承辦人姓名(原始來源可能沒有)
        /// </summary>
        public string SupervisorName { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///國情文號(原單位檔案編號)
        /// </summary>
        public string FileNo { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///案號
        /// </summary>
        public string CaseNo { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///案名
        /// </summary>
        public string CaseName { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///建檔日期(可能是111/11/15)
        /// </summary>
        public string CreateFileDate { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///案情摘要
        /// </summary>
        public string CaseAbstract { get; set; } //((nvarchar(MAX)), null)
        /// <summary>
        ///提報單位(該局處下的單位)
        /// </summary>
        public string ReportUnitCode { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///轉報人五碼
        /// </summary>
        public string TransReportPersonId { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///原報代號(承辦人五碼???)
        /// </summary>
        public string ReportNumber { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///來源字號
        /// </summary>
        public string SrcNumber { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///資料建立日期
        /// </summary>
        public DateTime CreateTime { get; set; } //(datetime, not null)
    }
}

