using IntelligenceOfillegal.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Helpers
{
    public class DateRangeHelper
    {
        /// <summary>
        /// 建立 API Error 物件
        /// </summary>
        /// <param name="errorType">錯誤類別, 值為 Constants.ErrorType</param>
        /// <param name="message">錯誤訊息 (給使用者看的)</param>
        /// <returns></returns>
        public static List<string> GetDateRange(string StartDate, string EndDate)
        {
            List<string> dateRange = new List<string>();
            DateTime dateStart = DateTime.Parse(StartDate);
            DateTime dateEnd = DateTime.Parse(EndDate);
            for (DateTime date = dateStart; date <= dateEnd; date = date.AddDays(1))
            {
                dateRange.Add(date.ToString("yyyy/MM/dd"));
            }
            return dateRange;
        }
    }
}