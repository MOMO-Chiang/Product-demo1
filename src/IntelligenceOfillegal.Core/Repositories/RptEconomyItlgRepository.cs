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
   public class RptEconomyItlgRepository : RepositoryBase<CaseManagement>, IRptEconomyItlgRepository
    {
        public RptEconomyItlgRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {
        }

        public Tuple<IEnumerable<RptEconomyItlgListModel>, int> SearchPaginated(RptEconomyItlgListSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = $@"
                select CM.ItlgSrcFileNo, 
                CM.ItlgSrcCreateFileDate, 
                CM.IntelligenceNo, 
                CM.ItlgSrcCaseName, 
                CM.ItlgSrcSupervisorId, 
                CM.SupervisorId, 
                CM.InvestigateProgressCode, 
                EV.Text AS InvestigateProgressName,
                CM.ReceiveReportNum, 
                CM.ItlgSrcReportUnitCode,
                UC1.UnitName AS ItlgSrcReportUnitName,
                CM.CaseDistributeUnit,
                UC2.UnitName AS CaseDistributeUnitName
                from [IntelligenceOfIllegal].[dbo].[CaseManagement] AS CM
                left join [IntelligenceOfIllegal].[dbo].[EnumerationValue] AS EV 
                ON EV.CategoryCode = 'DetectStep' and EV.Value = CM.InvestigateProgressCode
                left join [IntelligenceOfIllegal].[dbo].[MjibUnitCode] AS UC1
                ON UC1.UnitCode = CM.ItlgSrcReportUnitCode
                left join [IntelligenceOfIllegal].[dbo].[MjibUnitCode] AS UC2
                ON UC2.UnitCode = CM.CaseDistributeUnit
                  
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
           
            if (!string.IsNullOrEmpty(entity.ItlgSrcReportUnitName))
            {
                builder.Where($"UC1.UnitName like @ItlgSrcReportUnitName", new { ItlgSrcReportUnitName = "%" + entity.ItlgSrcReportUnitName + "%" });
            }
            if (entity.SetFileStartDate != null)
            {
                builder.Where($"CM.ItlgSrcCreateFileDate >= @SetFileStartDate", new { entity.SetFileStartDate });
            }
            if (entity.SetFileEndDate != null)
            {
                builder.Where($"CM.ItlgSrcCreateFileDate <= @SetFileEndDate", new { entity.SetFileEndDate });
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
            IEnumerable<RptEconomyItlgListModel> results = result.Read<RptEconomyItlgListModel>();
            int totalCount = result.ReadFirst<int>();
            Connection.Close();
            return new Tuple<IEnumerable<RptEconomyItlgListModel>, int>(results, totalCount);
        }

    }
}
