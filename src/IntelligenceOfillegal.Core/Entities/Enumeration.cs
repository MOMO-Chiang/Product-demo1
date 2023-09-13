using System;
using System.Collections.Generic;
using System.Linq;
using Dapper.Contrib.Extensions;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Entities
{
    [Table("Enumeration")]
    public class Enumeration
    {

        /// <summary>
        ///流水號
        /// </summary>
        [Key]
        public long Seq { get; set; } //(bigint, not null)

        /// <summary>
        ///類別代碼
        /// </summary>
        [ExplicitKey]
        public string CategoryCode { get; set; } //((nvarchar(50)), not null)

        /// <summary>
        ///類別名稱
        /// </summary>
        public string Category { get; set; } //((nvarchar(100)), null)

        /// <summary>
        ///該類別是否可讓用戶編輯
        /// </summary>
        public bool Editable { get; set; } //(bit, not null)
    }
}
