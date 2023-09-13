using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Entities
{
    [Table("MjibUnitCode")]
    public class MjibUnitCode
    {       
        /// <summary>
        ///單位代碼
        /// </summary>
        [ExplicitKey]
        public string UnitCode { get; set; } //((nvarchar(10)), not null)

        /// <summary>
        ///單位名稱
        /// </summary>
        public string UnitName { get; set; } //((nvarchar(50)), null)
    }
}
