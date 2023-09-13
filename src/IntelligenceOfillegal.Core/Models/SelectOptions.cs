using System;
using System.Collections.Generic;
using IntelligenceOfillegal.Common;

namespace IntelligenceOfillegal.Core.Models
{

    /// <summary>
    /// 搜尋分頁資料的參數
    /// </summary>
    public class SelectOptions
    {
        /// <summary>
        /// 下拉選單文字
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// 下拉選單value
        /// </summary>
        public string Value { get; set; }
    }

}
