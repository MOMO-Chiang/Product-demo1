using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Repositories.Interfaces
{
    public interface IIntelligenceFilelistRepository : IRepositoryBase<IntelligenceFilelist>
    {
        List<IntelligenceFilelist> GetByIntelligenceCaseId(string intelligenceCaseId);
        void DeletedIntelligenceFile(string userId, string intelligenceFileId, IUnitOfWorkBase _unitOfWork);
        IntelligenceFilelist GetByIntelligenceFileId(string intelligenceFileId);
    }
}
