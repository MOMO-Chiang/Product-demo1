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
   public class RptIntelligenceSourceRepository : RepositoryBase<CaseManagement>, IRptIntelligenceSourceRepository
    {
        public RptIntelligenceSourceRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {
        }

        public Tuple<IEnumerable<RptIntelligenceSourceListModel>, int> SearchPaginated(RptIntelligenceSourceListSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = $@"
WITH DateRangeFilter AS (
SELECT * FROM [IntelligenceOfIllegal].[dbo].[CaseManagement]
/**where**/
--WHERE (@SetFileStartDate = '' AND @SetFileEndDate = '') OR (CreateTime BETWEEN @SetFileStartDate AND @SetFileEndDate)
),
UnderSigning AS ( 
SELECT ItlgSrcReportUnitCode, InvestigateProgressCode, COUNT(InvestigateProgressCode) AS InvestigateProgressCodeCount
FROM DateRangeFilter
 WHERE InvestigateProgressCode = '08'
 GROUP BY ItlgSrcReportUnitCode, InvestigateProgressCode
),
AssignToInvestigation AS ( 
SELECT ItlgSrcReportUnitCode, InvestigateProgressCode, COUNT(InvestigateProgressCode) AS InvestigateProgressCodeCount
FROM DateRangeFilter
 WHERE InvestigateProgressCode = '01'
 GROUP BY ItlgSrcReportUnitCode, InvestigateProgressCode
),
AssignToFieldwork AS ( 
SELECT ItlgSrcReportUnitCode, InvestigateProgressCode, COUNT(InvestigateProgressCode) AS InvestigateProgressCodeCount
FROM DateRangeFilter
 WHERE InvestigateProgressCode = '02'
 GROUP BY ItlgSrcReportUnitCode, InvestigateProgressCode
),
AssistToInvestigation AS ( 
SELECT ItlgSrcReportUnitCode, InvestigateProgressCode, COUNT(InvestigateProgressCode) AS InvestigateProgressCodeCount
FROM DateRangeFilter
 WHERE InvestigateProgressCode = '03'
 GROUP BY ItlgSrcReportUnitCode, InvestigateProgressCode
),
FileForReference AS ( 
SELECT ItlgSrcReportUnitCode, InvestigateProgressCode, COUNT(InvestigateProgressCode) AS InvestigateProgressCodeCount
FROM DateRangeFilter
 WHERE InvestigateProgressCode = '04'
 GROUP BY ItlgSrcReportUnitCode, InvestigateProgressCode
),
MergeCase AS ( 
SELECT ItlgSrcReportUnitCode, InvestigateProgressCode, COUNT(InvestigateProgressCode) AS InvestigateProgressCodeCount
FROM DateRangeFilter
 WHERE InvestigateProgressCode = '05'
 GROUP BY ItlgSrcReportUnitCode, InvestigateProgressCode
), 
_data AS (
	SELECT MUC.UnitCode, 
	MUC.UnitName, 
	UnderSigning.InvestigateProgressCodeCount AS UnderSigning, 
	AssignToFieldwork.InvestigateProgressCodeCount AS AssignToFieldwork, 
	AssignToInvestigation.InvestigateProgressCodeCount AS AssignToInvestigation, 
	FileForReference.InvestigateProgressCodeCount AS FileForReference, 
	MergeCase.InvestigateProgressCodeCount AS MergeCase, 
	AssistToInvestigation.InvestigateProgressCodeCount AS AssistToInvestigation, 
		(ISNULL(UnderSigning.InvestigateProgressCodeCount, 0)+
		ISNULL(AssignToInvestigation.InvestigateProgressCodeCount, 0)+
		ISNULL(AssignToFieldwork.InvestigateProgressCodeCount, 0)+
		ISNULL(AssistToInvestigation.InvestigateProgressCodeCount, 0)+
		ISNULL(FileForReference.InvestigateProgressCodeCount, 0)+
		ISNULL(MergeCase.InvestigateProgressCodeCount, 0)
		) AS TotalCount 
	FROM [IntelligenceOfIllegal].[dbo].[MjibUnitCode] AS MUC
	LEFT JOIN UnderSigning ON UnderSigning.ItlgSrcReportUnitCode = MUC.UnitCode
	LEFT JOIN AssignToInvestigation ON AssignToInvestigation.ItlgSrcReportUnitCode = MUC.UnitCode
	LEFT JOIN AssignToFieldwork ON AssignToFieldwork.ItlgSrcReportUnitCode = MUC.UnitCode
	LEFT JOIN AssistToInvestigation ON AssistToInvestigation.ItlgSrcReportUnitCode = MUC.UnitCode
	LEFT JOIN FileForReference ON FileForReference.ItlgSrcReportUnitCode = MUC.UnitCode
	LEFT JOIN MergeCase ON MergeCase.ItlgSrcReportUnitCode = MUC.UnitCode
	)";

            string sql = $@"
                        {sqlSelect}
                    SELECT * FROM _data
                    /**orderby**/
                    OFFSET (@page - 1) * @pageSize ROWS
                    FETCH NEXT @pageSize ROWS ONLY;

                        {sqlSelect}
                    SELECT COUNT(*) FROM _data;";

            string sqlAll = $@"
                        {sqlSelect}
                    SELECT * FROM _data
                    /**orderby**/;

                        {sqlSelect}
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
            IEnumerable<RptIntelligenceSourceListModel> results = result.Read<RptIntelligenceSourceListModel>();
            int totalCount = result.ReadFirst<int>();
            Connection.Close();
            return new Tuple<IEnumerable<RptIntelligenceSourceListModel>, int>(results, totalCount);
        }

    }
}
