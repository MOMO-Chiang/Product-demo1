using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using Dapper;
using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.Models;
using IntelligenceOfillegal.Core.Repositories.Interfaces;
using IntelligenceOfillegal.Core.UnitOfWork;
using static Dapper.SqlBuilder;

namespace IntelligenceOfillegal.Core.Repositories.Interfaces
{
    public interface IRptEconomyItlgRepository : IRepositoryBase<CaseManagement>
    {
        Tuple<IEnumerable<RptEconomyItlgListModel>, int> SearchPaginated(RptEconomyItlgListSearchModel entity, PaginationWithSortedQueryModel paginated);
    }
}