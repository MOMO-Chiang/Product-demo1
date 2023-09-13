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
using static Dapper.SqlBuilder;

namespace IntelligenceOfillegal.Core.Repositories
{
    public class CaseManagementRepository : RepositoryBase<CaseManagement>, ICaseManagementRepository
    {
        public CaseManagementRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {
        }

        public Tuple<IEnumerable<CaseManagement>, int> SearchPaginated(CaseManagementSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} /**where**/";
            string sql = $@"
                WITH _data AS (
                    {sqlSelect}
                )
                SELECT * FROM _data
                /**orderby**/
                OFFSET (@page - 1) * @pageSize ROWS
                FETCH NEXT @pageSize ROWS ONLY;

                WITH _data AS (
                    {sqlSelect}
                )
                SELECT COUNT(*) FROM _data;";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql, new { paginated.Page, paginated.PageSize });

            builder.Where($@"(DeletedAt IS NULL OR DeletedAt = '0')");

            if (entity.CaseCategory != null)
            {
                builder.Where($"CaseCategory = @CaseCategory", new { entity.CaseCategory });
            }

            if (entity.IntelligenceNo != null)
            {
                builder.Where($@"IntelligenceNo LIKE '%{entity.IntelligenceNo}%'");
            }

            if (entity.InvestigateProgressCode != null)
            {
                builder.Where($"InvestigateProgressCode = @InvestigateProgressCode", new { entity.InvestigateProgressCode });
            }

            if (entity.ItlgSrcCaseName != null)
            {
                builder.Where($"ItlgSrcCaseName LIKE '%{entity.ItlgSrcCaseName}%'");
            }

            if (entity.MainSuspectName != null)
            {
                builder.Where($"MainSuspectName LIKE '%{entity.MainSuspectName}%'");
            }

            if (entity.ItlgSrcReportUnitCode != null)
            {
                builder.Where($"ItlgSrcReportUnitCode LIKE '%{entity.ItlgSrcReportUnitCode}%'");
            }

            if (entity.CreateTimeStart != null)
            {
                builder.Where($"CreateTime >= @CreateTimeStart", new { entity.CreateTimeStart });
            }

            if (entity.CreateTimeEnd != null)
            {
                builder.Where($"CreateTime <= @CreateTimeEnd", new { entity.CreateTimeEnd });
            }

            if (entity.Key != null)
            {
                builder.Where($"Remark LIKE '%{entity.Key}%' OR ItlgSrcCaseName LIKE '%{entity.Key}%' OR MainSuspectName LIKE '%{entity.Key}%' OR ItlgSrcCaseAbstract LIKE '%{entity.Key}%'");
            }

            if (!string.IsNullOrEmpty(paginated.SortedColumn))
            {
                if (paginated.SortedType == (int)Common.Enums.SortedType.DESC)
                {
                    builder.OrderBy(paginated.SortedColumn + " DESC");
                }
                else
                {
                    builder.OrderBy(paginated.SortedColumn);
                }
            }
            else
            {
                builder.OrderBy("(SELECT NULL)");
            }

            var result = Connection.QueryMultiple(template.RawSql, template.Parameters);
            IEnumerable<CaseManagement> results = result.Read<CaseManagement>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<CaseManagement>, int>(results, totalCount);
        }

        public CaseManagement GetByIntelligenceNo(string intelligenceNo)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} WHERE IntelligenceNo = @intelligenceNo";

            return Connection.Query<CaseManagement>(sql, new { intelligenceNo }).FirstOrDefault();
        }

        public CaseManagement GetByIntelligenceCaseId(string intelligenceCaseId)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} WHERE IntelligenceCaseId = @intelligenceCaseId";

            return Connection.Query<CaseManagement>(sql, new { intelligenceCaseId }).FirstOrDefault();
        }

        public CaseManagement GetBySeq(string seq)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} WHERE Seq = @seq";

            return Connection.Query<CaseManagement>(sql, new { seq }).FirstOrDefault();
        }

        public void DeletedCaseManagement(string userId, string seq)
        {
            string sql = $"UPDATE {GetTableNameMapper()} SET UpdateTime = GETDATE(), UpdateUser = @userId, DeletedAt = 1 WHERE Seq = @seq";

            Connection.Execute(sql, new { userId, seq });
        }

        public List<CaseManagement> GetBySuspectName(string mainsuspectname)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} WHERE MainSuspectName LIKE '%{mainsuspectname}%'";

            return Connection.Query<CaseManagement>(sql, new { mainsuspectname }).ToList();
        }
    }
}
