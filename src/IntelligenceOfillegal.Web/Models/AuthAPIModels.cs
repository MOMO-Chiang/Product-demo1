using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Models
{
    public class AuthLoginAPIQueryParams
    {
        /// <summary>
        /// 帳號
        /// </summary>
        public string Account { get; set; }

        /// <summary>
        /// 密碼
        /// </summary>
        public string Password { get; set; }
    }

    public class AuthLoginSSOAPIQueryParams
    {
        /// <summary>
        /// 帳號
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// 密碼
        /// </summary>
        public string UnitId { get; set; }
    }
}