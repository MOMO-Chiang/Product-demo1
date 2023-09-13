﻿using IntelligenceOfillegal.Core.DbConnectionFactory;
using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelligenceOfillegal.Core.Repositories
{
    public class MainLogRepository : RepositoryBase<MainLog>, IMainLogRepository
    {
        public MainLogRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

    }
}
