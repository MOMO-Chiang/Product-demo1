using IntelligenceOfillegal.Web.Models;
using NPOI.SS.Formula.Functions;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Web.Helpers
{
    public class DataHelper
    {
        public string GenIntelligenceNo()
        {
            return "MJIB-" + Guid.NewGuid().ToString();
        }
    }
}