using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace IntelligenceOfillegal.Common.Enums
{
    /// <summary>
    /// 檔案上傳角色種類(0:原始來源取得1,分案人上傳2.承辦人上傳)
    /// </summary>
    public enum UserUploadType
    {
        [Description("原始來源取得")]
        OriginalSource = 0,
        [Description("分案人上傳")]
        CaseDistributor = 1,
        [Description("承辦人上傳")]
        CaseHandler = 2,
    }

}