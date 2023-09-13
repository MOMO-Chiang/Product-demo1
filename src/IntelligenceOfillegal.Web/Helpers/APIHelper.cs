using IntelligenceOfillegal.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Helpers
{
    public class APIHelper
    {
        /// <summary>
        /// 建立 API Error 物件
        /// </summary>
        /// <param name="errorType">錯誤類別, 值為 Constants.ErrorType</param>
        /// <param name="message">錯誤訊息 (給使用者看的)</param>
        /// <returns></returns>
        public static APIError CreateAPIError(string errorType, string message)
        {
            var response = new APIError();
            response.Error = new APIErrorInfo
            {
                Message = message,
                Type = errorType
            };

            return response;
        }

        /// <summary>
        /// 建立 API Error 物件
        /// </summary>
        /// <param name="errorType"></param>
        /// <param name="message">錯誤訊息 (給使用者看的)</param>
        /// <param name="details">錯誤訊息細節 (Debug 用的資訊)</param>
        /// <returns></returns>
        public static APIError CreateAPIError(string errorType, string message, string details)
        {
            var response = new APIError();
            response.Error = new APIErrorInfo
            {
                Message = message,
                Type = errorType,
                Details = details
            };

            return response;
        }

        /// <summary>
        /// 建立 API Error 物件
        /// </summary>
        /// <param name="errorInfo">API 錯誤資訊物件</param>
        /// <returns></returns>
        public static APIError CreateAPIError(APIErrorInfo errorInfo)
        {
            var response = new APIError();
            response.Error = errorInfo;

            return response;
        }
    }
}