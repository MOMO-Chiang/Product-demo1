using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Common.Constants
{
    public static class ErrorType
    {
        /// <summary>
        /// 非法 ID
        /// </summary>
        public const string INVALID_ID = "INVALID_ID";

        /// <summary>
        /// 非法請求參數
        /// </summary>
        public const string INVALID_REQUEST_PARAMETERS = "INVALID_REQUEST_PARAMETERS";

        /// <summary>
        /// 找不到物件實體
        /// </summary>
        public const string INSTANCE_NOT_FOUND = "INSTANCE_NOT_FOUND";

        /// <summary>
        /// 物件實體已存在
        /// </summary>
        public const string INSTANCE_EXISTS = "INSTANCE_EXISTS";

        /// <summary>
        /// 日期格式錯誤
        /// </summary>
        public const string INVALID_DATE_FORMAT = "INVALID_DATE_FORMAT";

        /// <summary>
        /// 沒有檔案
        /// </summary>
        public const string EMPTY_FILE = "EMPTY_FILE";

        /// <summary>
        /// 檔案格式不支援
        /// </summary>
        public const string INVALID_FILE_EXTENSION = "INVALID_FILE_EXTENSION";

        /// <summary>
        /// 內部程式運行拋出的錯誤 (自定義的操作錯誤)
        /// </summary>
        public const string OPERATIONAL_EXCEPTION = "OPERATIONAL_EXCEPTION";

        /// <summary>
        /// 非法操作
        /// </summary>
        public const string INVALID_OPERATION = "INVALID_OPERATION";

        /// <summary>
        /// 伺服器內部發生錯誤
        /// </summary>
        public const string SERVER_INTERNAL_ERROR = "SERVER_INTERNAL_ERROR";
    }
}
