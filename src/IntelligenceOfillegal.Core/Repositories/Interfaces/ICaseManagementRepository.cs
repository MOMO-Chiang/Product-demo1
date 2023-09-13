using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Repositories.Interfaces
{
    public interface ICaseManagementRepository : IRepositoryBase<CaseManagement>
    {
        Tuple<IEnumerable<CaseManagement>, int> SearchPaginated(CaseManagementSearchModel entity, PaginationWithSortedQueryModel paginated);
        CaseManagement GetByIntelligenceNo(string intelligenceNo);
        CaseManagement GetBySeq(string seq);
        CaseManagement GetByIntelligenceCaseId(string intelligenceCaseId);
        void DeletedCaseManagement(string userId, string seq);
        List<CaseManagement> GetBySuspectName(string mainsuspectname);
    }
}
