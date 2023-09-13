using IntelligenceOfillegal.Core.DbConnectionFactory;
using IntelligenceOfillegal.Core.Repositories;
using IntelligenceOfillegal.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.UnitOfWork
{
    public class UnitOfWork : UnitOfWorkBase, IUnitOfWork
    {
        private const string connectionName = "IntelligenceOfillegal";
        private IDbConnectionFactory _dbConnectionFactory;
        private ICaseManagementRepository _IcaseManagementRepository;
        private IEnumerationRepository _IenumerationRepository;
        private IEnumerationValueRepository _IenumerationValueRepository;
        private IIntelligenceFilelistRepository _IintelligenceFilelistRepository;
        private IMainLogRepository _ImainLogRepository;
        private IMjibUnitCodeRepository _ImjibUnitCodeRepository;
        private IObjPersonRepository _IobjPersonRepository;
        private ISystemExceptionLogRepository _IsystemExceptionLogRepository;
        private ISystemUnitRespPersonRepository _IsystemUnitRespPersonRepository;
        private ISysUserListRepository _IsysUserListRepository;
        private IRptEconomyItlgRepository _IrptEconomyItlgRepository;
        private IRptIncorruptionItlgRepository _IrptIncorruptionItlgRepository;
        private IRptLaundryItlgRepository _IrptLaundryItlgRepository;
        private IRptUnitsProcStatusRepository _IrptUnitsProcStatusRepository;
        private IRptIntelligenceSourceRepository _IrptIntelligenceSourceRepository;
        private ICaseManagementTransferHistoryRepository _IcaseManagementTransferHistoryRepository;

        public UnitOfWork(IDbConnectionFactory dbConnectionFactory)
            : base(dbConnectionFactory, connectionName)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        // public ISysUserListRepository SysUserListRepository =>
        //     _sysUserListRepository ?? (_sysUserListRepository = new SysUserListRepository(_dbConnectionFactory, connectionName));

        public ICaseManagementRepository CaseManagementRepository =>
            _IcaseManagementRepository ?? (_IcaseManagementRepository = new CaseManagementRepository(_dbConnectionFactory, connectionName));

        public IEnumerationRepository EnumerationRepository =>
            _IenumerationRepository ?? (_IenumerationRepository = new EnumerationRepository(_dbConnectionFactory, connectionName));

        public IEnumerationValueRepository EnumerationValueRepository =>
            _IenumerationValueRepository ?? (_IenumerationValueRepository = new EnumerationValueRepository(_dbConnectionFactory, connectionName));

        public IIntelligenceFilelistRepository IntelligenceFilelistRepository =>
            _IintelligenceFilelistRepository ?? (_IintelligenceFilelistRepository = new IntelligenceFilelistRepository(_dbConnectionFactory, connectionName));

        public IMainLogRepository MainLogRepository =>
            _ImainLogRepository ?? (_ImainLogRepository = new MainLogRepository(_dbConnectionFactory, connectionName));

        public IMjibUnitCodeRepository MjibUnitCodeRepository =>
            _ImjibUnitCodeRepository ?? (_ImjibUnitCodeRepository = new MjibUnitCodeRepository(_dbConnectionFactory, connectionName));

        public IObjPersonRepository ObjPersonRepository =>
            _IobjPersonRepository ?? (_IobjPersonRepository = new ObjPersonRepository(_dbConnectionFactory, connectionName));

        public ISystemExceptionLogRepository SystemExceptionLogRepository =>
            _IsystemExceptionLogRepository ?? (_IsystemExceptionLogRepository = new SystemExceptionLogRepository(_dbConnectionFactory, connectionName));

        public ISystemUnitRespPersonRepository SystemUnitRespPersonRepository =>
            _IsystemUnitRespPersonRepository ?? (_IsystemUnitRespPersonRepository = new SystemUnitRespPersonRepository(_dbConnectionFactory, connectionName));

        public ISysUserListRepository SysUserListRepository =>
            _IsysUserListRepository ?? (_IsysUserListRepository = new SysUserListRepository(_dbConnectionFactory, connectionName));
        public IRptEconomyItlgRepository RptEconomyItlgRepository =>
            _IrptEconomyItlgRepository ?? (_IrptEconomyItlgRepository = new RptEconomyItlgRepository(_dbConnectionFactory, connectionName));
        public IRptIncorruptionItlgRepository RptIncorruptionItlgRepository =>
            _IrptIncorruptionItlgRepository ?? (_IrptIncorruptionItlgRepository = new RptIncorruptionItlgRepository(_dbConnectionFactory, connectionName));
        public IRptLaundryItlgRepository RptLaundryItlgRepository =>
            _IrptLaundryItlgRepository ?? (_IrptLaundryItlgRepository = new RptLaundryItlgRepository(_dbConnectionFactory, connectionName));
        public IRptUnitsProcStatusRepository RptUnitsProcStatusRepository =>
            _IrptUnitsProcStatusRepository ?? (_IrptUnitsProcStatusRepository = new RptUnitsProcStatusRepository(_dbConnectionFactory, connectionName));
        public IRptIntelligenceSourceRepository RptIntelligenceSourceRepository =>
            _IrptIntelligenceSourceRepository ?? (_IrptIntelligenceSourceRepository = new RptIntelligenceSourceRepository(_dbConnectionFactory, connectionName));

        public ICaseManagementTransferHistoryRepository CaseManagementTransferHistoryRepository =>
            _IcaseManagementTransferHistoryRepository ?? (_IcaseManagementTransferHistoryRepository = new CaseManagementTransferHistoryRepository(_dbConnectionFactory, connectionName));

        protected override void ResetRepositories()
        {
            //_sysUserListRepository = null;
            _IsysUserListRepository = null;
            _IenumerationRepository = null;
            _IenumerationValueRepository = null;
            _IcaseManagementRepository = null;
            _IcaseManagementTransferHistoryRepository = null;
        }
    }
}
