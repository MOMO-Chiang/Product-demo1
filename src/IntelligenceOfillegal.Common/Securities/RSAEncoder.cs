using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace IntelligenceOfillegal.Common.Securities
{
    public class RSAEncoder
    {
        public static string Encrypt(string rawText)
        {
            string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"APP_Data\rsa.public");
            var XML_PUBLICKEY = File.ReadAllText(path);

            var rsa = new RSACryptoServiceProvider(2048);
            rsa.FromXmlString(XML_PUBLICKEY);

            var rawData = Encoding.UTF8.GetBytes(rawText);
            //第二個參數指定是否使用OAEP提高安全性
            var encData = rsa.Encrypt(rawData, true);

            return Convert.ToBase64String(encData);
        }
    }
}
