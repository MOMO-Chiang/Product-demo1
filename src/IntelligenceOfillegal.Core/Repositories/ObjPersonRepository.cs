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
    public class ObjPersonRepository : RepositoryBase<ObjPerson>, IObjPersonRepository
    {
        public ObjPersonRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {
        }

        public List<ObjPerson> GetByIntelligenceCaseId(string intelligenceCaseId)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} WHERE IntelligenceCaseId = @intelligenceCaseId AND (DeletedAt IS NULL OR DeletedAt = '0')";

            return Connection.Query<ObjPerson>(sql, new { intelligenceCaseId }).ToList();
        }

        public void DeletedObjPerson(string userId, string objPersonId, IUnitOfWorkBase uow = null)
        {
            string sql = $"UPDATE {GetTableNameMapper()} SET UpdateTime = GETDATE(), UpdatePersonId = @userId, DeletedAt = 1 WHERE ObjPersonId = @objPersonId";

            Connection.Execute(sql, new { userId, objPersonId }, uow?.Transaction);
        }
    }
}
