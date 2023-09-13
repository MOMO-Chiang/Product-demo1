using IntelligenceOfillegal.Core.Repositories.Interfaces;
using IntelligenceOfillegal.Core.DbConnectionFactory;
using IntelligenceOfillegal.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data;

namespace IntelligenceOfillegal.Core.UnitOfWork
{
    public abstract class UnitOfWorkBase : IUnitOfWorkBase
    {
        private string _connectionName;
        private IDbConnectionFactory _dbConnectionFactory;
        private Dictionary<string, object> _repositories;
        private IDbConnection _connection;
        private bool _disposed;

        public UnitOfWorkBase(IDbConnectionFactory dbConnectionFactory, string connectionName)
        {
            _connectionName = connectionName;
            _dbConnectionFactory = dbConnectionFactory;
            _connection = dbConnectionFactory.GetConnection(connectionName);
        }

        public IDbTransaction Transaction { get; private set; }

        protected virtual void ResetRepositories()
        {
            _repositories = null;
        }

        //protected abstract void ResetRepositories();

        public void BeginTransaction()
        {
            if (_connection.State == ConnectionState.Closed || _connection.State == ConnectionState.Broken)
            {
                _connection.Open();
            }
            Transaction = _connection.BeginTransaction();
        }

        public void Commit()
        {
            Transaction.Commit();
            Transaction?.Dispose();
            Transaction = null;
            ResetRepositories();
        }

        public void RollBack()
        {
            Transaction?.Rollback();
            Transaction?.Dispose();
            Transaction = null;
            ResetRepositories();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    Transaction?.Dispose();
                }
            }

            _disposed = true;
        }

        public IRepositoryBase<T> GetRepository<T>() where T : class, new()
        {
            if (_repositories == null)
            {
                _repositories = new Dictionary<string, object>();
            }

            string typeName = typeof(T).Name;

            if (!_repositories.ContainsKey(typeName))
            {
                Type type = typeof(RepositoryBase<>);

                object repositoryInstance =
                    Activator.CreateInstance(type.MakeGenericType(typeof(T)), _dbConnectionFactory, _connectionName);

                _repositories.Add(typeName, repositoryInstance);
            }

            return (IRepositoryBase<T>)_repositories[typeName];
        }

        ~UnitOfWorkBase()
        {
            Dispose(false);
        }
    }
}
