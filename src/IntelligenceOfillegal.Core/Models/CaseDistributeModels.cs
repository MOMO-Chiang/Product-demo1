using Dapper.Contrib.Extensions;
using IntelligenceOfillegal.Common.Constants;
using IntelligenceOfillegal.Core.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Models
{

    /// <summary>
    /// 分案
    /// </summary>
    public class CaseDistributeModel
    {
        /// <summary>
        /// 案件情資編號
        /// </summary>
        public string IntelligenceNo { get; set; }

        /// <summary>
        /// 分案單位(25:經防處 31:廉政處) 由分案人所屬單位決定
        /// </summary>
        public string CaseDistributeUnit { get; set; }
        /// <summary>
        /// 分案類別( 0:無 ,1:廉能 ,2:非廉能 ) 無給經防用
        /// </summary>
        public string CaseCategory { get; set; }
        /// <summary>
        /// 對象類別代碼
        /// </summary>
        public string ObjectCategory { get; set; }
        /// <summary>
        /// 承辦人單位代碼(科)
        /// </summary>
        public string SupervisorDepartment { get; set; }
        /// <summary>
        /// 承辦人人事五碼
        /// </summary>
        public string SupervisorId { get; set; }
        /// <summary>
        /// 主要對象序號(對應到 ObjPerson 資料表)
        /// </summary>
        public string ObjPersonId { get; set; }

        /// <summary>
        /// 主要對象身分證號
        /// </summary>
        public string MainSuspectId { get; set; }

        /// <summary>
        /// 主要對象姓名
        /// </summary>
        public string MainSuspectName { get; set; }


    }
}
