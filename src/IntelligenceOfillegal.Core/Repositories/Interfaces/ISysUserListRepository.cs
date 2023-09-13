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
    public interface ISysUserListRepository : IRepositoryBase<SysUserList>
    {
        Tuple<IEnumerable<SysUserList>, int> SearchPaginated(SystemUsersSearchModel entity, PaginationWithSortedQueryModel paginated);

        void UpdateSysUserList(SystemUsersUpdateModel systemUsersUpdateModel);
        void UpdateIsValid(SystemUsersUpdateModel systemUsersUpdateModel);
    }
}
