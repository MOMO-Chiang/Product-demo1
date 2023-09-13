using IntelligenceOfillegal.Common.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Factories
{

    public class DepartmentFactory
    {
        /// <summary>
        /// 取得連線字串Name 以及 資料表名稱
        /// </summary>
        /// <param name="department"></param>
        /// <returns></returns>
        public DepartmentDBInfo GetDepartmentInfo(Department department)
        {
            DepartmentDBInfo departmentInfo = new DepartmentDBInfo();
            switch (department)
            {
                case Department.Domestic:
                    departmentInfo.ConnectionName = "Control18";
                    departmentInfo.TableName = "View18";
                    break;
                case Department.Security:
                    departmentInfo.ConnectionName = "Control19";
                    departmentInfo.TableName = "View19";
                    break;
                case Department.Laundry:
                    departmentInfo.ConnectionName = "Control35";
                    departmentInfo.TableName = "View35";
                    break;

            }

            return departmentInfo;
        }

        public class DepartmentDBInfo
        {
            public string ConnectionName { get; set; }
            public string TableName { get; set; }
        }
    }
}
