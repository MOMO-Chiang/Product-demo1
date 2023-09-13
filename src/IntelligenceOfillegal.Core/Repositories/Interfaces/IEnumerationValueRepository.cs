using Dapper;
using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.Models;
using IntelligenceOfillegal.Core.Repositories.Interfaces;
using IntelligenceOfillegal.Core.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Repositories.Interfaces
{
    public interface IEnumerationValueRepository : IRepositoryBase<EnumerationValue>
    {
        Tuple<IEnumerable<BasicCodeQueryModel>, int> SearchPaginated(BasicCodeSearchModel entity, PaginationWithSortedQueryModel paginated);

        void UpdateBasicCode(BasicCodeUpdateModel basicCodeUpdateModel);
        void UpdateIsActived(BasicCodeUpdateModel basicCodeUpdateModel);
        List<SelectOptions> GetSelectOptions(string type);
        EnumerationValue GetByCategoryCodeAndValue(string categoryCode, string value);
        List<EnumerationValue> GetAllValue();
    }
}
