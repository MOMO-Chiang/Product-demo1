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
    public class SystemUnitRespPersonRepository : RepositoryBase<SystemUnitRespPerson>, ISystemUnitRespPersonRepository
    {
        public SystemUnitRespPersonRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public Tuple<IEnumerable<SystemUnitRespPerson>, int> SearchPaginated(SystemUnitRespPersonSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = $@"
SELECT [Seq]
    ,ISNULL([MjibUnitCode].[UnitName], [SURP].[SystemPlatformUnitCode]) AS 'SystemPlatformUnitName'
    ,[SURP].[UnitCode]
    ,[SURP].[UnitName]
    ,[ResponsiblePerson1]
    ,[ResponsiblePerson2]
    ,[ResponsiblePerson3]
    ,[UpdateUserId]
    ,[UpdateUserName]
    ,[UpdateTime]
    ,[CreatePersonId]
    ,[CreateIP]
    ,[CreateTime]
FROM {GetTableNameMapper()} SURP
LEFT JOIN [IntelligenceOfIllegal].[dbo].[MjibUnitCode] ON [SystemPlatformUnitCode] = [MjibUnitCode].[UnitCode]

                  
                /**where**/";

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

            string sqlAll = $@"
                    WITH _data AS (
                        {sqlSelect}
                    )
                    SELECT * FROM _data
                    /**orderby**/;

                    WITH _data AS (
                        {sqlSelect}
                    )
                    SELECT COUNT(*) FROM _data;";

            SqlBuilder builder = new SqlBuilder();
            Template template;

            if (paginated.IsAll == true)
            {
                template = builder.AddTemplate(sqlAll);
            }
            else
            {
                template = builder.AddTemplate(sql, new { paginated.Page, paginated.PageSize });
            }

            if (entity.UnitCode != null)
            {
                builder.Where($"SURP.[UnitCode] LIKE '%' + @UnitCode + '%'", new { entity.UnitCode });
            }

            if (entity.UnitName != null)
            {
                builder.Where($"SURP.[UnitName] LIKE '%' + @UnitName + '%'", new { entity.UnitName });
            }

            if (entity.ResponsiblePerson != null)
            {
                builder.Where($@"([ResponsiblePerson1] LIKE '%' + @ResponsiblePerson + '%') OR
                                ([ResponsiblePerson2] LIKE '%' + @ResponsiblePerson + '%') OR
                                ([ResponsiblePerson3] LIKE '%' + @ResponsiblePerson + '%')", new { entity.ResponsiblePerson });
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
            IEnumerable<SystemUnitRespPerson> results = result.Read<SystemUnitRespPerson>();
            int totalCount = result.ReadFirst<int>();
            Connection.Close();

            return new Tuple<IEnumerable<SystemUnitRespPerson>, int>(results, totalCount);
        }

        public IEnumerable<SelectOptions> GetResponsiblePersonOptions(string UnitCode)
        {
            string sqlSelect = $@"
SELECT [UserID] AS 'Value',
    [UserID] + ' ' + [UserName] AS 'Text'
FROM [FakeFullOffice]
WHERE [UnitCode] = @UnitCode;
";

            var result = Connection.Query<SelectOptions>(sqlSelect, new { UnitCode });
            Connection.Close();

            return result;
        }

        public void UpdateSystemUnitRespPerson(SystemUnitRespPerson updateModel)
        {
            string sqlUpdate = $@"
UPDATE {GetTableNameMapper()}
SET [ResponsiblePerson1] = @ResponsiblePerson1,
[ResponsiblePerson2] = @ResponsiblePerson2,
[ResponsiblePerson3] = @ResponsiblePerson3,
[UpdateUserId] = @UpdateUserId,
[UpdateUserName] = (SELECT TOP 1 [UserName] FROM [FakeFullOffice] WHERE [UserID] = @UpdateUserId),
[UpdateTime] = @UpdateTime
WHERE [Seq] = @seq;
";

            Connection.Execute(sqlUpdate, updateModel);
            Connection.Close();
        }
    }
}
