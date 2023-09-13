using IntelligenceOfillegal.Common.Constants;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Attributes
{
    [AttributeUsage(AttributeTargets.Property, Inherited = false)]
    public class WhereOperatorAttribute : Attribute
    {
        private string _operator = TSqlOperator.EqualTo;
        public string Operator
        {
            get { return _operator; }
        }

        public WhereOperatorAttribute(string @operator = TSqlOperator.EqualTo)
        {
            _operator = @operator;
        }
    }
}
