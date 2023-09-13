using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.DbConnectionFactory
{
    public class DbConnectionFactory : IDbConnectionFactory, IDisposable
    {
        private readonly Dictionary<string, SqlConnection> _dbConnections = new Dictionary<string, SqlConnection>();

        public SqlConnection GetConnection(string connectionName)
        {
            try
            {
                if (_dbConnections.ContainsKey(connectionName) == false)
                {
                    var connectionString = ConfigurationManager.ConnectionStrings[connectionName].ConnectionString;
                    var connection = new SqlConnection(connectionString);
                    _dbConnections.Add(connectionName, connection);
                }

                return _dbConnections[connectionName];
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Clear()
        {
            foreach (var connection in _dbConnections)
            {
                connection.Value.Close();
            }
            _dbConnections.Clear();
        }

        public void Dispose()
        {
            Clear();
        }
    }
}
