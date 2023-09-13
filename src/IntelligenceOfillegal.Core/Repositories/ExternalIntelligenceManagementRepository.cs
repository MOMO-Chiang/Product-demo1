using Dapper;
using IntelligenceOfillegal.Common.Enums;
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
using static IntelligenceOfillegal.Core.Factories.DepartmentFactory;

namespace IntelligenceOfillegal.Core.Repositories
{
    public class ExternalIntelligenceRepository : RepositoryBase<ExternalIntelligence>, IExternalIntelligenceRepository
    {
        private readonly string _tableName;
        public ExternalIntelligenceRepository(IDbConnectionFactory dbConnectionFactory, DepartmentDBInfo departmentInfo)
            : base(dbConnectionFactory, departmentInfo.ConnectionName)
        {
            _tableName = departmentInfo.TableName;
        }

        public override IEnumerable<ExternalIntelligence> GetAll()
        {
            return Connection.Query<ExternalIntelligence>($"SELECT * FROM {_tableName}");
        }

        /// <summary>
        /// 動態Where查詢資料表
        /// <para> TSearch可自定義Property的Attribute </para>
        /// <para> WhereColumnNameAttribute: 查詢欄位, 預設為Property.Name </para>
        /// <para> WhereOperatorAttribute: 運算符號, 預設為等號 </para>
        /// </summary>
        /// <typeparam name="TSearch"></typeparam>
        /// <param name="searchModel"></param>
        /// <returns></returns>
        public virtual IEnumerable<ExternalIntelligence> QuerySearch<TSearch>(TSearch searchModel)
        {
            string sql =
                $@"
                    SELECT *
                    FROM {_tableName} 
                    /**where**/
                    /**orderby**/
                ";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql);

            GenerateWhereConditionClause(builder, searchModel);

            builder.OrderBy("(SELECT NULL)");

            return Connection.Query<ExternalIntelligence>(template.RawSql, template.Parameters);
        }

        /// <summary>
        /// 查詢資料表
        /// <para> TSearch可自定義Property的Attribute </para>
        /// <para> WhereColumnNameAttribute: 查詢欄位, 預設為Property.Name </para>
        /// <para> WhereOperatorAttribute: 運算符號, 預設為等號 </para>
        /// </summary>
        /// <typeparam name="TSearch"></typeparam>
        /// <param name="searchModel"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        public new Tuple<IEnumerable<ExternalIntelligence>, int> QuerySearchPaginated<TSearch>(TSearch searchModel, PaginationWithSortedQueryModel paginated = null)
        {
            string sqlSelect = $"SELECT * FROM {_tableName} /**where**/";
            string sql = $@"
                WITH _data AS (
                    {sqlSelect}
                )
                SELECT * FROM _data
                /**orderby**/
                {(paginated.IsAll
                    ? ""
                    : @"OFFSET (@page - 1) * @pageSize ROWS
                        FETCH NEXT @pageSize ROWS ONLY")};

                WITH _data AS (
                    {sqlSelect}
                )
                SELECT COUNT(*) FROM _data;";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql);

            if (!paginated.IsAll)
            {
                builder.AddParameters(new { paginated.Page, paginated.PageSize });
            }

            GenerateWhereConditionClause(builder, searchModel);

            if (!string.IsNullOrEmpty(paginated?.SortedColumn))
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
            IEnumerable<ExternalIntelligence> results = result.Read<ExternalIntelligence>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<ExternalIntelligence>, int>(results, totalCount);
        }

    }
}
