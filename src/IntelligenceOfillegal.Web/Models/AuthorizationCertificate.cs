using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Service.Models
{
    public class AuthorizationCertificate
    {
        /// <summary>
        /// 授權權杖
        /// </summary>
        public string Token { get; set; }

        /// <summary>
        /// RefreshToken
        /// </summary>
        public string RefreshToken { get; set; }

        /// <summary>
        /// 到期時間 (timestamp)
        /// </summary>
        public int Expires { get; set; }

        /// <summary>
        /// 證書擁有者
        /// </summary>
        public string Username { get; set; } = string.Empty;

        /// <summary>
        /// 證書擁有者 id
        /// </summary>
        public string UserId { get; set; } = string.Empty;
    }
}
