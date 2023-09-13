using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Models
{
    /// <summary>
    /// API 錯誤物件
    /// </summary>
    public class APIError
    {
        /// <summary>
        /// API 錯誤資訊
        /// </summary>
        public APIErrorInfo Error { get; set; }
    }

    /// <summary>
    /// API 錯誤資訊物件
    /// </summary>
    public class APIErrorInfo
    {
        /// <summary>
        /// 錯誤類別, 值為 Constants.ErrorType
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// 錯誤訊息 (給使用者看的)
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 錯誤訊息細節 (給內部 Debug 用的資訊)
        /// </summary>
        public string Details { get; set; }

        /// <summary>
        /// Exception.StackTrace
        /// </summary>
        public string StackTrace { get; set; }
    }
}