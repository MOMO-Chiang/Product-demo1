using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Entities
{
    [Table("FileList")]
    public class FileList
    {
        /// <summary>
        ///對應到view表的seq
        /// </summary>
        public long Seq { get; set; } //(bigint, not null)
        /// <summary>
        ///檔案名稱
        /// </summary>
        public string FileName { get; set; } //((nvarchar(100)), null)
        /// <summary>
        ///檔案完整路徑
        /// </summary>
        public string FilePath { get; set; } //((nvarchar(300)), null)
    }

}

