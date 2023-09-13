using System;
using System.Collections.Generic;
using IntelligenceOfillegal.Common;

namespace IntelligenceOfillegal.Core.Models
{

    /// <summary>
    /// 搜尋分頁資料的參數
    /// </summary>
    public class PaginatedQueryModel
    {
        /// <summary>
        /// 頁碼
        /// </summary>
        public int Page { get; set; } = 1;

        /// <summary>
        /// 分頁大小
        /// </summary>
        public int PageSize { get; set; } = 10;

        /// <summary>
        /// 是否撈取全部
        /// </summary>
        public bool IsAll { get; set; } = false;
    }

    public class PaginationWithSortedQueryModel : PaginatedQueryModel
    {
        /// <summary>
        /// 排序類別
        /// </summary>
        public int SortedType { get; set; } = (int)Common.Enums.SortedType.DESC;

        /// <summary>
        /// 排序欄位
        /// </summary>
        public string SortedColumn { get; set; } = String.Empty;
    }

    /// <summary>
    /// 分頁資訊
    /// </summary>
    public class PaginatedInfo
    {
        /// <summary>
        /// 頁碼
        /// </summary>
        public int Page { get; set; }

        /// <summary>
        /// 分頁大小
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// 總頁數
        /// </summary>
        public int TotalPage { get; set; }

        /// <summary>
        /// 當前頁碼的資料筆數
        /// </summary>
        public int PageCount { get; set; }

        /// <summary>
        /// 總資料筆數
        /// </summary>
        public int TotalCount { get; set; }
    }

    /// <summary>
    /// 分頁結果資料
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class PaginatedResult<T>
    {
        /// <summary>
        /// 分頁資訊
        /// </summary>
        public PaginatedInfo PaginatedInfo { get; set; } = new PaginatedInfo();

        /// <summary>
        /// 資料
        /// </summary>
        public List<T> Data { get; set; } = new List<T>();
    }

}
