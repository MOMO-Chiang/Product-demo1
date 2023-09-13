using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Repositories.Interfaces
{
    public interface ISystemUnitRespPersonRepository : IRepositoryBase<SystemUnitRespPerson>
    {
        Tuple<IEnumerable<SystemUnitRespPerson>, int> SearchPaginated(SystemUnitRespPersonSearchModel entity, PaginationWithSortedQueryModel paginated);
        void UpdateSystemUnitRespPerson(SystemUnitRespPerson updateModel);

        IEnumerable<SelectOptions> GetResponsiblePersonOptions(string unitCode);
    }
}
