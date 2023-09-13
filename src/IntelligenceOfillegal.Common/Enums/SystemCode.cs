using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Common.Enums
{
    public enum SystemCode
    {
        [Description("法眼")]
        A055 = 1,

        [Description("天網")]
        A296 = 2,

        [Description("財稅系統")]
        A521 = 3,

        [Description("智慧整合查詢平臺")]
        A584 = 4,

        [Description("行動調查系統")]
        A588 = 5,

        [Description("財稅-進銷項")]
        A591 = 6,

        [Description("財稅-證交稅")]
        A592 = 7,

        [Description("財稅-財產所得")]
        A658 = 8,
    }

}