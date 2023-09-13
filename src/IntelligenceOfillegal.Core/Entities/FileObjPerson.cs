using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Entities
{
    [Table("ObjPerson")]
    public class FileObjPerson
    {
        /// <summary>
        ///對應view流水號
        /// </summary>
        public long Seq { get; set; } //(bigint, not null)
        /// <summary>
        ///對象職稱
        /// </summary>
        public string PersonTitle { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///對象姓名
        /// </summary>
        public string PersonName { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///對象統一編號
        /// </summary>
        public string PersonID { get; set; } //((nvarchar(50)), null)
    }
}

