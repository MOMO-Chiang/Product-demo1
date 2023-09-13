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
    public class EnumerationRepository : RepositoryBase<Enumeration>, IEnumerationRepository
    {
        private static List<Enumeration> allEnumeration = new List<Enumeration>();
        public EnumerationRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {
            if (allEnumeration.Count == 0) allEnumeration = this.GetAllEnumeration();
        }

        public List<SelectOptions> GetSelectOptions()
        {
            string sql = $@"SELECT Category as Text, CategoryCode as Value FROM　{GetTableNameMapper()} WHERE Editable = 'True' ";
            return Connection.Query<SelectOptions>(sql).ToList();
        }

        public List<Enumeration> GetAllEnumeration()
        {
            string sql = $@"SELECT * FROM　{GetTableNameMapper()} ";
            return Connection.Query<Enumeration>(sql, commandTimeout: 600).ToList();
        }
    }
}
