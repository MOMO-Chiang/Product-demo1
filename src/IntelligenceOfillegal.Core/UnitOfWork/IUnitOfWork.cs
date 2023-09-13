using IntelligenceOfillegal.Core.Repositories;
using IntelligenceOfillegal.Core.Repositories.Interfaces;

namespace IntelligenceOfillegal.Core.UnitOfWork
{
    public interface IUnitOfWork : IUnitOfWorkBase
    {
        ICaseManagementRepository CaseManagementRepository { get; }
        IEnumerationRepository EnumerationRepository { get; }
        IEnumerationValueRepository EnumerationValueRepository { get; }
        IIntelligenceFilelistRepository IntelligenceFilelistRepository { get; }
        IMainLogRepository MainLogRepository { get; }
        IMjibUnitCodeRepository MjibUnitCodeRepository { get; }
        IObjPersonRepository ObjPersonRepository { get; }
        ISystemExceptionLogRepository SystemExceptionLogRepository { get; }
        ISystemUnitRespPersonRepository SystemUnitRespPersonRepository { get; }
        ISysUserListRepository SysUserListRepository { get; }
        IRptEconomyItlgRepository RptEconomyItlgRepository { get; }
        IRptIncorruptionItlgRepository RptIncorruptionItlgRepository { get; }
        IRptLaundryItlgRepository RptLaundryItlgRepository { get; }
        IRptUnitsProcStatusRepository RptUnitsProcStatusRepository { get; }
        IRptIntelligenceSourceRepository RptIntelligenceSourceRepository { get; }
        ICaseManagementTransferHistoryRepository CaseManagementTransferHistoryRepository { get; }
    }
}
