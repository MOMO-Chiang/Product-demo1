using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Repositories.Interfaces
{
    public interface IObjPersonRepository : IRepositoryBase<ObjPerson>
    {
        List<ObjPerson> GetByIntelligenceCaseId(string intelligenceCaseId);
        void DeletedObjPerson(string userId, string objPersonId, IUnitOfWorkBase _unitOfWork);
    }
}
