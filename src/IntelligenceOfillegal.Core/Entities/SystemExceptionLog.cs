using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Entities
{
    /// <summary>
    ///  Exception 紀錄 
    /// </summary>
    [Table("SystemExceptionLog")]
    public class SystemExceptionLog
    {
        [Key]
        /// <summary>
        ///自動序號
        /// </summary>
        public long Seq { get; set; } //(bigint, not null)

        /// <summary>
        ///人事五碼
        /// </summary>
        public string QMan { get; set; } //((nvarchar(10)), null)

        /// <summary>
        ///查詢IP
        /// </summary>
        public string QIp { get; set; } //((nvarchar(25)), null)

        /// <summary>
        ///查詢項目
        /// </summary>
        public string QItem { get; set; } //((nvarchar(MAX)), null)

        /// <summary>
        ///回覆內容
        /// </summary>
        public string QContent { get; set; } //((nvarchar(MAX)), null)

        /// <summary>
        ///UserAgent
        /// </summary>
        public string UserAgent { get; set; } //((nvarchar(200)), null)

        /// <summary>
        ///瀏覽器資訊
        /// </summary>
        public string Browser { get; set; } //((nvarchar(200)), null)

        /// <summary>
        ///action名稱
        /// </summary>
        public string ActionName { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///Controller名稱
        /// </summary>
        public string ControllerName { get; set; } //((nvarchar(100)), null)

        /// <summary>
        ///request提交的參數
        /// </summary>
        public string Paramaters { get; set; } //((nvarchar(500)), null)

        /// <summary>
        ///request網址
        /// </summary>
        public string RequestUri { get; set; } //((nvarchar(300)), null)

        /// <summary>
        ///Exception訊息
        /// </summary>
        public string ExceptionMessage { get; set; } //((nvarchar(MAX)), null)

        /// <summary>
        ///StackTrace
        /// </summary>
        public string ExceptionStackTrace { get; set; } //((nvarchar(MAX)), null)

        [Key]
        /// <summary>
        /// 紀錄建立時間
        /// </summary>
        public DateTime CreateTime { get; set; } //(datetime, not null)

    }
}
