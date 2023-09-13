using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Common.Utilities
{
    /// <summary>
    /// 操作型 Exeception，用於可預期之錯誤。
    /// </summary>
    public class OperationalException : Exception
    {
        public string ErrorType { get; set; }

        public string Details { get; set; }

        public OperationalException(string message) : base(message)
        {
            ErrorType = Constants.ErrorType.OPERATIONAL_EXCEPTION;
            Details = "";
        }

        public OperationalException(string errorType, string message) : base(message)
        {
            ErrorType = errorType;
            Details = "";
        }

        public OperationalException(string errorType, string message, string details) : base(message)
        {
            ErrorType = errorType;
            Details = details;
        }

        public OperationalException(string errorType, string message, string details, Exception inner) : base(message, inner)
        {
            ErrorType = errorType;
            Details = details;
        }

    }
}
