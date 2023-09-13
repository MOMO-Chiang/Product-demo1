using IntelligenceOfillegal.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Models
{
    public class SystemUnitRespPersonQueryParams : PaginationWithSortedQueryModel
    {
        /// <summary>
        /// 單位代碼(轄區)
        /// </summary>
        public string UnitCode { get; set; }
        /// <summary>
        /// 單位名稱
        /// </summary>
        public string UnitName { get; set; }
        /// <summary>
        /// 局承辦人-1
        /// </summary>
        public string ResponsiblePerson { get; set; }
    }

    public class SystemUnitRespPersonUpdateParams
    {
        /// <summary>
        ///局承辦人-1
        /// </summary>
        public string ResponsiblePerson1 { get; set; }

        /// <summary>
        ///局承辦人-2
        /// </summary>
        public string ResponsiblePerson2 { get; set; }

        /// <summary>
        ///局承辦人-3
        /// </summary>
        public string ResponsiblePerson3 { get; set; }
    }
}