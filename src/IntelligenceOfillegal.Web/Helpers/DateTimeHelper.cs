using IntelligenceOfillegal.Web.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Helpers
{
    public class DateTimeHelper
    {
        /// <summary>
        /// 日期格式分隔符號
        /// </summary>
        public const char DATE_FORMAT_SPLITTER_CHAR = '/';
        /// <summary>
        /// 日期格式分隔符號
        /// </summary>
        public const char TIME_FORMAT_SPLITTER_CHAR = ':';
        /// <summary>
        /// Data 格式
        /// </summary>
        public const string DATE_FORMAT = "yyyy/MM/dd";

        /// <summary>
        /// Time 格式
        /// </summary>
        public const string TIME_FORMAT = "HH:mm:ss";

        /// <summary>
        /// DateTime 格式
        /// </summary>
        public const string DATETIME_FORMAT = "yyyy/MM/dd HH:mm:ss";

        /// <summary>
        /// 取得當前 UTC DateTime 物件 
        /// </summary>
        /// <returns></returns>
        public static DateTime GetNowUtc()
        {
            return DateTime.Now.ToUniversalTime();
        }

        /// <summary>
        /// 取得 存入資料庫使用 DateTime 物件
        /// </summary>
        /// <returns></returns>
        public static DateTime GetDBSaveDatatime(DateTime datatime)
        {
            //return datatime.ToLocalTime();
            if (datatime.Kind == DateTimeKind.Utc)
                return datatime;
            else
            {
                var tempTime = new DateTime(datatime.Ticks, DateTimeKind.Local);
                return TimeZoneInfo.ConvertTimeToUtc(tempTime);
            }

        }
        /// <summary>
        /// 讀取 資料庫時間 改為本地時間 DateTime 物件
        /// (Liunx 系統抓不到local時區，所以給定轉為台北時區)
        /// </summary>
        /// <returns></returns>
        public static DateTime GetDBShowDatatime(DateTime datatime)
        {
            // 使用 TimeZoneInfo 先取得台北時區
            var timeZone = TimeZoneInfo.FindSystemTimeZoneById("Taipei Standard Time");

            //return datatime.ToLocalTime();
            if (datatime.Kind == DateTimeKind.Utc)
                return TimeZoneInfo.ConvertTime(datatime, timeZone);
            else
                return datatime;
        }

        /// <summary>
        /// 日期字串 轉 DateTime
        /// </summary>
        /// <param name="dateStr"></param>
        /// <returns></returns>
        public static DateTime ConvertToDateTime(string dateStr)
        {
            return Convert.ToDateTime(dateStr);
        }

        /// <summary>
        /// 日期字串 轉 UTC DateTime
        /// </summary>
        /// <param name="dateStr"></param>
        /// <returns></returns>
        public static DateTime ConvertToUtcDateTime(string dateStr)
        {
            return Convert.ToDateTime(dateStr).ToUniversalTime();
        }

        /// <summary>
        /// DateTime 轉 Date 字串
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static string ConvertToDateString(DateTime date)
        {
            return date.ToString(DATE_FORMAT);
        }

        /// <summary>
        /// DateTime 轉 民國年string
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static string ConvertToRocDateString(DateTime date)
        {
            return $"{date.Year - 1911}/{date:MM/dd}";
        }

        /// <summary>
        /// DateTime 轉 DateTime 字串
        /// </summary>
        /// <param name="datetime"></param>
        /// <returns></returns>
        public static string ConvertToDateTimeString(DateTime date)
        {
            return date.ToString(DATETIME_FORMAT);
        }

        /// <summary>
        /// 取得當前時區的時間戳
        /// </summary>
        /// <returns></returns>
        public static int GetLocalTimeZoneTimestamp()
        {
            var timeSpan = DateTime.Now - TimeZoneInfo.ConvertTimeFromUtc(new DateTime(1970, 1, 1, 0, 0, 0), TimeZoneInfo.Local);

            return (int)timeSpan.TotalSeconds;
        }

        /// <summary>
        /// 取得 UTC 的時間戳
        /// </summary>
        /// <returns></returns>
        public static int GetUtcTimestamp()
        {
            var timeSpan = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0);

            return (int)timeSpan.TotalSeconds;
        }

        /// <summary>
        /// 將 DateTime 轉換為當前時區的時間戳
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static int ConvertToLocalTimeZoneTimestamp(DateTime dateTime)
        {
            var timeSpan = dateTime - TimeZoneInfo.ConvertTimeFromUtc(new DateTime(1970, 1, 1, 0, 0, 0), TimeZoneInfo.Local);

            return (int)timeSpan.TotalSeconds;
        }

        /// <summary>
        /// 將 DateTime 轉換為 UTC 的時間戳
        /// </summary>
        /// <param name="dateTime"></param>
        /// <returns></returns>
        public static int ConvertToUtcTimestamp(DateTime dateTimeUtc)
        {
            var timeSpan = dateTimeUtc - new DateTime(1970, 1, 1, 0, 0, 0);

            return (int)timeSpan.TotalSeconds;
        }

        /// <summary>
        /// 民國年轉換
        /// </summary>
        public string ParseAndFormatDate(string originalDate)
        {
            if (DateTime.TryParse(originalDate, out DateTime parsedDateTime))
            {
                // 進行轉換成民國年的格式，例如：112/05/09
                string formattedDate = $"{parsedDateTime.Year - 1911}/{parsedDateTime:MM/dd}";
                return formattedDate;
            }
            else
            {
                return originalDate; // 如果解析失敗，保留原字串
            }
        }

        public DateTime? ConvertStringToTimestamp(string originalString)
        {
            
            //判斷分割符號
            if (originalString.Contains('/'))
            {
                string[] parts = originalString.Split('/');
                originalString = parts[0] + int.Parse(parts[1]).ToString("00") + int.Parse(parts[2]).ToString("00");
            }



            //判斷長度
            if (originalString.Length == 7)
            {
                DateTime newDateTime = DateTime.ParseExact(originalString, "yyyMMdd", CultureInfo.InvariantCulture);
                return newDateTime.AddYears(1911);
            }
            else if (originalString.Length == 8)
            {
                return DateTime.ParseExact(originalString, "yyyyMMdd", CultureInfo.InvariantCulture);
            }
            else
            {
                return null;
            }
        }

    }
}
