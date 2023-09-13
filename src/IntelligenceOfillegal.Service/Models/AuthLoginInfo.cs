using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Service.Models
{
    public class AuthLoginInfo
    {
        /// <summary>
        /// Token
        /// </summary>
        public string Token { get; set; }

        /// <summary>
        /// 到期時間戳 (13碼)
        /// </summary>
        public long Expires { get; set; }

        /// <summary>
        /// 登入使用者資料
        /// </summary>
        public AuthLoginUserInfo UserInfo { get; set; }

        /// <summary>
        /// 使用者權限
        /// </summary>
        public Permission Permissions { get; set; }
    }

    public class AuthLoginUserInfo
    {
        /// <summary>
        /// 登入者 id
        /// </summary>
        public string Uid { get; set; }

        /// <summary>
        /// 登入者姓名
        /// </summary>
        public string Username { get; set; }
    }

    public class Permission
    {

        /// <summary>
        /// Dashboard
        /// </summary>
        public bool Dashboard { get; set; }

        /// <summary>
        /// 測試案例維護
        /// </summary>
        public bool TestCaseList { get; set; }

        /// <summary>
        /// 測試報告
        /// </summary>
        public bool TestReport { get; set; }

        /// <summary>
        /// 系統名稱
        /// </summary>
        public bool SystemReport { get; set; }

        /// <summary>
        /// 局處單位
        /// </summary>
        public bool UnitReport { get; set; }

        /// <summary>
        /// 使用者
        /// </summary>
        public bool UserReport { get; set; }
    }
}
