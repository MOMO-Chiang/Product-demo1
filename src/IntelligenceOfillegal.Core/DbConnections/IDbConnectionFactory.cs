using System.Data.SqlClient;

namespace IntelligenceOfillegal.Core.DbConnectionFactory
{
    public interface IDbConnectionFactory
    {
        SqlConnection GetConnection(string connectionName);

        void Clear();
    }
}
