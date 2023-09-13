using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Entities
{
    [Table("MainLog")]

    public class MainLog
    {
        /// <summary>
        ///自動序號
        /// </summary>
        [Key]
        public long QId { get; set; } //(bigint, not null)
        /// <summary>
        ///單位代碼
        /// </summary>
        public string QDept { get; set; } //((nvarchar(10)), null)
        /// <summary>
        ///人事五碼
        /// </summary>
        public string QMan { get; set; } //((nvarchar(10)), null)
        /// <summary>
        ///查詢時間
        /// </summary>
        public DateTime QTime { get; set; } //(datetime, null)
        /// <summary>
        ///查詢IP
        /// </summary>
        public string QIp { get; set; } //((nvarchar(25)), null)
        /// <summary>
        ///系統編號
        /// </summary>
        public string QSystemCode { get; set; } //((nvarchar(10)), null)
        /// <summary>
        ///案名/案號
        /// </summary>
        public string QCaseName { get; set; } //((nvarchar(100)), null)
        /// <summary>
        ///建立時間
        /// </summary>
        [Key]
        public DateTime CreateTime { get; set; } //(datetime, null)
        /// <summary>
        ///委託查詢
        /// </summary>
        public string QManClient { get; set; } //((nvarchar(25)), null)
        /// <summary>
        ///查詢項目
        /// </summary>
        public string QItem { get; set; } //((nvarchar(MAX)), null)
        /// <summary>
        ///查詢內容
        /// </summary>
        public string QContent { get; set; } //((nvarchar(MAX)), null)
        /// <summary>
        ///搜尋時間區間
        /// </summary>
        public double QDataTime { get; set; } //(float, null)
        /// <summary>
        ///測試:0/正式1
        /// </summary>
        public string QPrint { get; set; } //((nvarchar(5)), null)
        /// <summary>
        ///註記
        /// </summary>
        public string Qmemo { get; set; } //((nvarchar(MAX)), null)
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
        public string Paramaters { get; set; } //((nvarchar(300)), null)
        public string RequestUri { get; set; } //((nvarchar(300)), null)
    }
}
