namespace IntelligenceOfillegal.Web.Models
{
    public class AuthLoginInfo
    {
        /// <summary>
        /// Token
        /// </summary>
        public string Token { get; set; }

        /// <summary>
        /// 到期時間戳 (13碼)
        /// </summary>
        public long Expires { get; set; }

        /// <summary>
        /// 登入使用者資料
        /// </summary>
        public AuthLoginUserInfo UserInfo { get; set; }

        /// <summary>
        /// 使用者權限
        /// </summary>
        public Permission Permissions { get; set; }
    }

    public class AuthLoginUserInfo
    {
        /// <summary>
        /// 登入者 id
        /// </summary>
        public string Uid { get; set; }

        /// <summary>
        /// 登入者姓名
        /// </summary>
        public string Username { get; set; }
    }
}
