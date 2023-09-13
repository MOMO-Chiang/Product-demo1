using Dapper;
using IntelligenceOfillegal.Core.DbConnectionFactory;
using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.Repositories.Interfaces;
using IntelligenceOfillegal.Core.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Repositories
{
    public class IntelligenceFilelistRepository : RepositoryBase<IntelligenceFilelist>, IIntelligenceFilelistRepository
    {
        public IntelligenceFilelistRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {
        }


        public List<IntelligenceFilelist> GetByIntelligenceCaseId(string intelligenceCaseId)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} WHERE IntelligenceCaseId = @intelligenceCaseId  AND (DeletedAt IS NULL OR DeletedAt = '0')";

            return Connection.Query<IntelligenceFilelist>(sql, new { intelligenceCaseId }).ToList();
        }

        public void DeletedIntelligenceFile(string userId, string intelligenceFileId, IUnitOfWorkBase uow = null)
        {
            string sql = $"UPDATE {GetTableNameMapper()} SET UpdateTime = GETDATE(), UpdateUser = @userId, DeletedAt = 1 WHERE IntelligenceFileId = @intelligenceFileId";

            Connection.Execute(sql, new { userId, intelligenceFileId }, uow?.Transaction);
        }

        public IntelligenceFilelist GetByIntelligenceFileId(string intelligenceFileId)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} WHERE IntelligenceFileId = @intelligenceFileId";

            return Connection.Query<IntelligenceFilelist>(sql, new { intelligenceFileId }).FirstOrDefault();
        }

    }
}
