using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Attributes
{
    [AttributeUsage(AttributeTargets.Property, Inherited = false)]
    public class WhereColumnNameAttribute : Attribute
    {
        private string _columnName = "";
        public string ColumnName
        {
            get { return _columnName; }
        }

        public WhereColumnNameAttribute(string columnName)
        {
            _columnName = columnName;
        }
    }
}
