using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;

namespace IntelligenceOfillegal.Common.Securities
{
    public class JwtManager
    {
        public static bool TryValidateToken(string token, out ClaimsPrincipal principal)
        {
            principal = null;
            if (string.IsNullOrWhiteSpace(token))
            {
                return false;
            }

            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);

                if (jwt == null)
                {
                    return false;
                }

                RSACryptoServiceProvider rsa = new RSACryptoServiceProvider();
                string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"APP_Data\rsa.public");
                var XML_PUBLICKEY = File.ReadAllText(path);
                rsa.FromXmlString(XML_PUBLICKEY);

                var validationParameters = new TokenValidationParameters()
                {
                    RequireExpirationTime = true,
                    RequireSignedTokens = true,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    IssuerSigningKey = new RsaSecurityKey(rsa),
                    ClockSkew = TimeSpan.Zero,
                    TryAllIssuerSigningKeys = true,
                    IssuerSigningKeys = new List<SecurityKey> { new RsaSecurityKey(rsa) }
                    //LifetimeValidator = LifetimeValidator
                };
                principal = handler.ValidateToken(token, validationParameters, out SecurityToken securityToken);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static string GetPersonId(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.ReadJwtToken(token);

            return jwt.Claims.First(claim => claim.Type == "PersonId").Value;
        }

        public static string GetSystemCode(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.ReadJwtToken(token);

            return jwt.Claims.First(claim => claim.Type == "SystemCode").Value;
        }
    }
}
