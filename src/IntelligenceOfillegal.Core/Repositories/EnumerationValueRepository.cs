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
    public class EnumerationValueRepository : RepositoryBase<EnumerationValue>, IEnumerationValueRepository
    {
        public EnumerationValueRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {
        }

        public Tuple<IEnumerable<BasicCodeQueryModel>, int> SearchPaginated(BasicCodeSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = $"SELECT envalue.*, en.Category " +
                               $"FROM EnumerationValue envalue " +
                               $"LEFT JOIN Enumeration en ON envalue.CategoryCode = en.CategoryCode /**where**/";

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

            if (entity.CategoryCode != null)
            {
                builder.Where($"envalue.CategoryCode = @CategoryCode", new { entity.CategoryCode });
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
            IEnumerable<BasicCodeQueryModel> results = result.Read<BasicCodeQueryModel>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<BasicCodeQueryModel>, int>(results, totalCount);
        }

        public void UpdateBasicCode(BasicCodeUpdateModel basicCodeUpdateModel)
        {
            string sqlSelect = $"UPDATE EnumerationValue SET IsActived = @IsActived , Text = @Text , " +
                               $"UpdatePersonId = @UpdatePersonId, UpdateTime = @UpdateTime WHERE [CategoryCode] = @CategoryCode AND [Value] = @Value";
            Connection.Execute(sqlSelect, basicCodeUpdateModel);
        }

        public void UpdateIsActived(BasicCodeUpdateModel basicCodeUpdateModel)
        {
            string sqlSelect = $"UPDATE EnumerationValue SET IsActived = @IsActived , " +
                               $"UpdatePersonId = @UpdatePersonId, UpdateTime = @UpdateTime WHERE [CategoryCode] = @CategoryCode AND [Value] = @Value";
            Connection.Execute(sqlSelect, basicCodeUpdateModel);
        }
        public List<SelectOptions> GetSelectOptions(string type)
        {
            string sql = $@"SELECT Text , Value FROM　{GetTableNameMapper()} WHERE CategoryCode = @type AND IsActived = 1";
            return Connection.Query<SelectOptions>(sql, new { type }).ToList();
        }
        public EnumerationValue GetByCategoryCodeAndValue(string categoryCode, string value)
        {
            string sql = $@"SELECT * FROM　{GetTableNameMapper()} WHERE CategoryCode = @categoryCode AND Value = @value ";
            return Connection.Query<EnumerationValue>(sql, new { categoryCode, value }).FirstOrDefault();
        }

        public List<EnumerationValue> GetAllValue()
        {
            string sql = $@"SELECT * FROM　{GetTableNameMapper()}";
            return Connection.Query<EnumerationValue>(sql).ToList();
        }

    }
}
