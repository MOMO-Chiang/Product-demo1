using Dapper;
using IntelligenceOfillegal.Core.DbConnectionFactory;
using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.Models;
using IntelligenceOfillegal.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Repositories
{
    public class CaseManagementTransferHistoryRepository : RepositoryBase<CaseManagementTransferHistory>, ICaseManagementTransferHistoryRepository
    {
        public CaseManagementTransferHistoryRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {
           
        }
        public List<CaseManagementTransferHistory> GetByIntelligenceCaseId(string intelligenceCaseId)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} WHERE IntelligenceCaseId = @intelligenceCaseId";

            return Connection.Query<CaseManagementTransferHistory>(sql, new { intelligenceCaseId }).ToList();
        }
    }
}
