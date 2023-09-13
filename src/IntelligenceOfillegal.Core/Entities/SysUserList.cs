using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Entities
{
    [Table("SysUserList")]
    public class SysUserList
    {

        /// <summary>
        ///自動序號
        /// </summary>
        [Key]
        public long Seq { get; set; } //(bigint, not null)

        /// <summary>
        ///使用者帳號(人事五碼)
        /// </summary>
        public string UserId { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///使用者名稱
        /// </summary>
        public string UserName { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///單位代碼
        /// </summary>
        public string UnitCode { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///單位名稱
        /// </summary>
        public string UnitName { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///有效
        /// </summary>
        public bool IsValid { get; set; } //(bit, not null)

        /// <summary>
        ///身分別功能權限0:無權限1:承辦人2:業管長官3.分案人
        /// </summary>
        public int Permission { get; set; } //(int, not null)

        /// <summary>
        ///是否為管理員
        /// </summary>
        public bool IsAdmin { get; set; } //(bit, not null)

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
        ///建立時間
        /// </summary>
        [Key]
        public DateTime CreateTime { get; set; } //(datetime, not null)
    }
}
