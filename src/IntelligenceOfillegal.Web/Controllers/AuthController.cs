using IntelligenceOfillegal.Common.Constants;
using IntelligenceOfillegal.Common.Utilities;
using IntelligenceOfillegal.Web.Helpers;
using IntelligenceOfillegal.Web.Models;
using System;
using System.Configuration;
using System.Net;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Net.Http;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using System.Text;
using IntelligenceOfillegal.Service.Models;
using IntelligenceOfillegal.Common.Securities;
using System.Web;
using System.Security.Principal;

namespace IntelligenceOfillegal.Web.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private string SYSTEMINFO = "IntelligenceOfillegal";
        /// <summary>
        /// 登入
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Login([FromBody] AuthLoginAPIQueryParams queryParams)
        {
            #region 檢核參數
            if (string.IsNullOrEmpty(queryParams.Account))
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ErrorType.INVALID_REQUEST_PARAMETERS, $"帳號未輸入"));
            }

            if (string.IsNullOrEmpty(queryParams.Password))
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ErrorType.INVALID_REQUEST_PARAMETERS, $"密碼未輸入"));
            }
            #endregion
            try
            {
                AuthLoginInfo authLoginInfo = await LoginAD(queryParams.Account, queryParams.Password);
                return Ok(authLoginInfo);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// SSO登入跳轉
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("login/sso")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> LoginSSO(AuthLoginSSOAPIQueryParams queryParams)
        {
            try
            {
                if (!Request.Properties.TryGetValue("MS_HttpContext", out object reqProperty))
                {
                    throw new OperationalException(
                    ErrorType.INVALID_OPERATION,
                    $@"無法取得帳號");
                }
                HttpContextWrapper context = (HttpContextWrapper)reqProperty;

                AuthLoginInfo authLoginInfo = await LoginSSO(queryParams.UserId);

                return Ok(authLoginInfo);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        public async Task<AuthLoginInfo> LoginAD(string adUser, string password)
        {
            string userDescription = "";
            //string userName = "";
            string userName = adUser;

            #region AD驗證
            try
            {
                string adServer = ConfigurationManager.AppSettings["ADServer"] ?? @"10.39.11.31";
                string adUserWithDomain = adUser + "@mjib.gov.tw";

                //using (HostingEnvironment.Impersonate())
                //using (var domainContext = new PrincipalContext(ContextType.Domain, adServer, adUserWithDomain, password))
                //{
                //    bool isValid = domainContext.ValidateCredentials(adUserWithDomain, password, ContextOptions.SimpleBind);

                //    if (!isValid)
                //    {
                //        throw new Exception("帳號或密碼錯誤");
                //    }

                //    using (var userPrinciple = UserPrincipal.FindByIdentity(domainContext, adUser))
                //    {
                //        adUser = userPrinciple.Name;
                //        userName = userPrinciple.DisplayName;
                //        userDescription = userPrinciple.Description;
                //    }
                //}

                AuthorizationCertificate certificate = await CreateToken(adUser, userName);
                var authLoginInfo = new AuthLoginInfo()
                {
                    Token = certificate.Token,
                    Expires = (long)certificate.Expires * 1000,
                    UserInfo = new AuthLoginUserInfo
                    {
                        Uid = adUser,
                        Username = userName
                    },
                    Permissions = new Permission
                    {
                        Dashboard = true,
                        TestCaseList = true,

                        srcDomestic = true,
                        srcSecure = true,
                        srcLaundry = true,

                        SystemUsers = true,
                        BasicCode = true,
                        CaseManagement = true,
                        RptEconomyIntelligence = true,
                    }
                };

                return authLoginInfo;
            }
            catch (Exception ex)
            {
                throw new OperationalException(
                ErrorType.INVALID_OPERATION,
                $@"AD驗證錯誤: {ex.Message}");
            }
            #endregion
        }

        public async Task<AuthLoginInfo> LoginSSO(string adUser)
        {
            string adDomain = "";
            string userDescription = "";
            string userName = "";
            IPrincipal principal = HttpContext.Current.User;
            if (!adUser.StartsWith("m") || !adUser.StartsWith("M"))
            {
                adUser = "m" + adUser;
            }
            try
            {
                string adServer = ConfigurationManager.AppSettings["ADServer"] ?? @"10.39.11.31";

                //var adData = adUser.Split(new char[] { '\\' });
                //if (adData.Length == 2)
                //{
                //    adDomain = adData[0];
                //    adUser = adData[1];
                //}

                using (PrincipalContext domainContext = new PrincipalContext(ContextType.Domain, adServer))
                using (UserPrincipal userPrinciple = UserPrincipal.FindByIdentity(domainContext, adUser))
                {
                    adUser = userPrinciple.Name;
                    userName = userPrinciple.DisplayName;
                    userDescription = userPrinciple.Description;
                }
            }
            catch (Exception ex)
            {
                throw new OperationalException(
                ErrorType.INVALID_OPERATION,
                $@"AD驗證錯誤: {ex.Message} {ex.StackTrace} {adDomain} {adUser} {principal.Identity.Name}");
            }

            AuthorizationCertificate certificate = await CreateToken(adUser, userName);
            var authLoginInfo = new AuthLoginInfo()
            {
                Token = certificate.Token,
                Expires = (long)certificate.Expires * 1000,
                UserInfo = new AuthLoginUserInfo
                {
                    Uid = adUser,
                    Username = userName
                },
                Permissions = new Permission
                {
                    Dashboard = true,
                    TestCaseList = true,

                    srcDomestic = true,
                    srcSecure = true,
                    srcLaundry = true,

                    CaseManagement = true,
                    RptEconomyIntelligence = true,
                }
            };
            return authLoginInfo;
        }

        private async Task<AuthorizationCertificate> CreateToken(string userId, string userName)
        {
            // Auth Server 取得token
            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                var content = new
                {
                    SystemCode = SYSTEMINFO,
                    SystemPWD = SYSTEMINFO,
                    PersonId = userId,
                    //UnitId = "34",
                    Today = 123456,
                    Payload = new { },
                };
                var postData = new
                {
                    EncryptText = RSAEncoder.Encrypt(JsonConvert.SerializeObject(content)),
                };

                //string url = ConfigurationManager.AppSettings["AuthServerURL"];
                //StringContent stringContent = new StringContent(new JavaScriptSerializer().Serialize(postData), Encoding.UTF8, "application/json");
                //HttpResponseMessage response = await client.PostAsync(url, stringContent).ConfigureAwait(false);
                //response.EnsureSuccessStatusCode();
                //string responseStr = await response.Content.ReadAsStringAsync();

                //var ret = JsonConvert.DeserializeObject<dynamic>(responseStr);
                //var result = new AuthorizationCertificate
                //{
                //    Token = ret.access_token,
                //    RefreshToken = ret.refresh_token,
                //    Expires = ret.expires_in,
                //    UserId = userId,
                //    Username = userName,
                //};

                var now = DateTime.Now;
                var futureDate = now.AddDays(1);
                var expires = (int)(futureDate - now).TotalMilliseconds;
                var result = new AuthorizationCertificate
                {
                    Token = "aaaabbbb",
                    RefreshToken = "aaaabbbb",
                    Expires = expires,
                    UserId = userId,
                    Username = userName,
                };

                return result;
            }
        }
    }
}
