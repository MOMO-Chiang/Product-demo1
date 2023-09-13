using IntelligenceOfillegal.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Models
{
    /// <summary>
    /// Search 條件
    /// </summary>
    public class SystemUsersQueryParams : PaginationWithSortedQueryModel
    {
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
        ///身分別功能權限0:無權限1:承辦人2:業管長官3.分案人
        /// </summary>
        public int Permission { get; set; } //(int, not null)
    }

    /// <summary>
    /// Update 資料
    /// </summary>
    public class SystemUsersUpdateParams
    {
        /// <summary>
        ///自動序號
        /// </summary>
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
        public DateTime CreateTime { get; set; } //(datetime, not null)
    }

    /// <summary>
    /// SysUserList
    /// </summary>
    public class SysUserListDTO
    {
        /// <summary>
        ///自動序號
        /// </summary>
        public long Seq { get; set; }

        /// <summary>
        ///使用者帳號(人事五碼)
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        ///使用者名稱
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        ///單位代碼
        /// </summary>
        public string UnitCode { get; set; }

        /// <summary>
        ///單位名稱
        /// </summary>
        public string UnitName { get; set; }

        /// <summary>
        ///有效
        /// </summary>
        public bool IsValid { get; set; }

        /// <summary>
        ///身分別功能權限0:無權限1:承辦人2:業管長官3.分案人
        /// </summary>
        public int Permission { get; set; }

        /// <summary>
        ///最後異動人員帳號
        /// </summary>
        public string UpdateUserId { get; set; }

        /// <summary>
        ///最後異動人員名稱
        /// </summary>
        public string UpdateUserName { get; set; }

        /// <summary>
        ///最後異動時間
        /// </summary>
        public string UpdateTime { get; set; }

        /// <summary>
        ///建立時間
        /// </summary>
        public string CreateTime { get; set; }
    }
}