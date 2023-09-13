using IntelligenceOfillegal.Core.DbConnectionFactory;
using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.Models;
using IntelligenceOfillegal.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using static Dapper.SqlBuilder;

namespace IntelligenceOfillegal.Core.Repositories
{
   public class RptLaundryItlgRepository : RepositoryBase<CaseManagement>, IRptLaundryItlgRepository
    {
        public RptLaundryItlgRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {
        }

        public Tuple<IEnumerable<RptLaundryItlgListModel>, int> SearchPaginated(RptLaundryItlgListSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = $@"
                   SELECT [Seq]
                  ,[ItlgSrcUnitCode]
                  ,[ItlgSrcUnitName]
                  ,[IntelligenceNo]
                  ,[ItlgSrcCreateFileDate]
                  ,[ItlgSrcFileNo]
                  ,[MainCaseType]
                  ,[MainCaseTypeName]
                  ,[ItlgSrcSupervisorId]
                  ,[CreateTime]
                  ,[ReceiveReportNum]
                  ,[ItlgSrcCaseName]
                  ,[InvestigateProgressCode]
                  ,[InvestigateProgressName]
                  ,[SupervisorDepartment]
                  ,[SupervisorDepartmentName]
                  ,[ElectionItlgNotes]
              FROM [IntelligenceOfIllegal].[dbo].[View_Rpt_Laundry_Itlg]
                  
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

            if(paginated.IsAll == true)
            {
                template = builder.AddTemplate(sqlAll);
            }else
            {
                template = builder.AddTemplate(sql, new { paginated.Page, paginated.PageSize });
            }
           
            if (entity.SetFileStartDate != null)
            {
                builder.Where($"CreateTime >= @SetFileStartDate", new { entity.SetFileStartDate });
            }
            if (entity.SetFileEndDate != null)
            {
                builder.Where($"CreateTime <= @SetFileEndDate", new { entity.SetFileEndDate });
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
            IEnumerable<RptLaundryItlgListModel> results = result.Read<RptLaundryItlgListModel>();
            int totalCount = result.ReadFirst<int>();
            Connection.Close();
            return new Tuple<IEnumerable<RptLaundryItlgListModel>, int>(results, totalCount);
        }

    }
}
