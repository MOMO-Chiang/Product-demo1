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
    public class BasicCodeQueryParams : PaginationWithSortedQueryModel
    {
        /// <summary>
        ///類別代碼
        /// </summary>
        public string CategoryCode { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///類別名稱
        /// </summary>
        public string Category { get; set; } //((nvarchar(100)), null)
    }

    /// <summary>
    /// Create 資料
    /// </summary>
    public class BasicCodeCreateParams
    {
        /// <summary>
        ///流水號
        /// </summary>
        public long Seq { get; set; } //(bigint, not null)

        /// <summary>
        ///類別代碼
        /// </summary>
        public string CategoryCode { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///顯示名稱代碼
        /// </summary>
        public string Value { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///顯示名稱
        /// </summary>
        public string Text { get; set; } //((nvarchar(100)), null)

        /// <summary>
        ///是否啟用
        /// </summary>
        public bool IsActived { get; set; } //(bit, not null)

        /// <summary>
        ///資料異動人員五碼
        /// </summary>
        public string UpdatePersonId { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料異動時間
        /// </summary>
        public DateTime? UpdateTime { get; set; } //(datetime, null)

        /// <summary>
        ///資料建立人員五碼
        /// </summary>
        public string CreatePersonId { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///資料建立者IP
        /// </summary>
        public string CreateIP { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; } //(datetime, not null)
    }

    /// <summary>
    /// Update 資料
    /// </summary>
    public class BasicCodeUpdateParams
    {
        /// <summary>
        ///流水號
        /// </summary>
        public long Seq { get; set; } //(bigint, not null)

        /// <summary>
        ///類別代碼
        /// </summary>
        public string CategoryCode { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///顯示名稱代碼
        /// </summary>
        public string Value { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///顯示名稱
        /// </summary>
        public string Text { get; set; } //((nvarchar(100)), null)

        /// <summary>
        ///是否啟用
        /// </summary>
        public bool IsActived { get; set; } //(bit, not null)

        /// <summary>
        ///資料異動人員五碼
        /// </summary>
        public string UpdatePersonId { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料異動時間
        /// </summary>
        public DateTime? UpdateTime { get; set; } //(datetime, null)

        /// <summary>
        ///資料建立人員五碼
        /// </summary>
        public string CreatePersonId { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///資料建立者IP
        /// </summary>
        public string CreateIP { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; } //(datetime, not null)
    }

    /// <summary>
    /// EnumerationValue & Enumeration
    /// </summary>
    public class BasicCodeDTO
    {
        /// <summary>
        ///流水號
        /// </summary>
        public long Seq { get; set; }

        /// <summary>
        ///類別代碼
        /// </summary>
        public string CategoryCode { get; set; }

        /// <summary>
        ///類別名稱
        /// </summary>
        public string Category { get; set; }

        /// <summary>
        ///顯示名稱代碼
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        ///顯示名稱
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        ///是否啟用
        /// </summary>
        public bool IsActived { get; set; }

        /// <summary>
        ///資料異動人員五碼
        /// </summary>
        public string UpdatePersonId { get; set; }

        /// <summary>
        ///資料異動時間
        /// </summary>
        public string UpdateTime { get; set; }

        /// <summary>
        ///資料建立人員五碼
        /// </summary>
        public string CreatePersonId { get; set; }

        /// <summary>
        ///資料建立者IP
        /// </summary>
        public string CreateIP { get; set; }

        /// <summary>
        ///資料建立時間
        /// </summary>
        public string CreateTime { get; set; }
    }
}