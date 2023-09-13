using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Entities
{
    [Table("IntelligenceFilelist")]
    public class IntelligenceFilelist
    {

        /// <summary>
        ///流水號
        /// </summary>
        [Key]
        public long Seq { get; set; } //(bigint, not null)

        /// <summary>
        ///檔案唯一序號
        /// </summary>
        [Key]
        public Guid IntelligenceFileId { get; set; } //(uniqueidentifier, not null)

        /// <summary>
        ///對應CaseManagement序號
        /// </summary>
        public Guid IntelligenceCaseId { get; set; } //(uniqueidentifier, not null)

        /// <summary>
        ///原始檔案名稱
        /// </summary>
        public string OriginFileName { get; set; } //((nvarchar(100)), not null)

        /// <summary>
        ///原始檔案路徑(資料落地前的原始下載連結)
        /// </summary>
        public string OriginFilePath { get; set; } //((nvarchar(300)), not null)

        /// <summary>
        ///新檔案名稱
        /// </summary>
        public string NewFileName { get; set; } //((nvarchar(100)), not null)

        /// <summary>
        ///資料落地後的檔案路徑
        /// </summary>
        public string NewFilePath { get; set; } //((nvarchar(300)), not null)

        /// <summary>
        ///檔案上傳腳色種類(0:原始來源取得1,分案人上傳2.承辦人上傳)
        /// </summary>
        public int UserUploadType { get; set; } //(int, not null)

        /// <summary>
        ///資料建立者人事五碼,系統自動帶入則無
        /// </summary>
        public string CreatePersonId { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料建立者IP
        /// </summary>
        public string CreateIP { get; set; } //((nvarchar(50)), null)

        /// <summary>
        ///資料建立時間
        /// </summary>
        [Key]
        public DateTime CreateTime { get; set; } //(datetime, not null)

        /// <summary>
        ///更新時間
        /// </summary>
        public DateTime? UpdateTime { get; set; } //(datetime, null)

        /// <summary>
        ///更新人員
        /// </summary>
        public string UpdateUser { get; set; } //(string, null)

        /// <summary>
        ///是否刪除
        /// </summary>
        public bool? DeletedAt { get; set; } //(string, null)
    }

}
