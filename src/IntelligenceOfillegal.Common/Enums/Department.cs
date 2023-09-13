using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Common.Enums
{
    /// <summary>
    /// 外部情資案件管理(部門)
    /// </summary>
    public enum Department
    {
        [Description("國內安全調查處")]
        Domestic = 18,
        [Description("保防處")]
        Security = 19,
        [Description("洗錢防制處")]
        Laundry = 35,
    }

}