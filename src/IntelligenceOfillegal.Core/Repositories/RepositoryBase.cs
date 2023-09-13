using Dapper;
using Dapper.Contrib.Extensions;
using IntelligenceOfillegal.Common.Constants;
using IntelligenceOfillegal.Core.Attributes;
using IntelligenceOfillegal.Core.DbConnectionFactory;
using IntelligenceOfillegal.Core.Models;
using IntelligenceOfillegal.Core.Repositories.Interfaces;
using IntelligenceOfillegal.Core.UnitOfWork;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using static Dapper.SqlBuilder;

namespace IntelligenceOfillegal.Core.Repositories
{
    public class RepositoryBase<TModel> : IRepositoryBase<TModel> where TModel : class, new()
    {
        private readonly IDbConnection _connection;

        public RepositoryBase(IDbConnectionFactory dbConnectionFactory, string connectionName)
        {
            _connection = dbConnectionFactory.GetConnection(connectionName);
        }

        protected IDbConnection Connection
        {
            get
            {
                if (_connection.State == ConnectionState.Closed || _connection.State == ConnectionState.Broken)
                {
                    _connection.Open();
                }
                return _connection;
            }
        }

        public void Dispose()
        {
            _connection.Dispose();
        }

        #region Delete

        public bool Delete(TModel obj, IUnitOfWorkBase uow = null)
        {
            return Connection.Delete(obj, uow?.Transaction);
        }

        public bool Delete(IEnumerable<TModel> list, IUnitOfWorkBase uow = null)
        {
            return Connection.Delete(list, uow?.Transaction);
        }

        public bool DeleteAll(IUnitOfWorkBase uow = null)
        {
            return Connection.DeleteAll<TModel>(uow?.Transaction);
        }

        #endregion Delete

        #region Get

        public TModel Get(dynamic id)
        {
            return SqlMapperExtensions.Get<TModel>(Connection, id);
        }

        public TModel GetNumber(string Number)
        {
            return SqlMapperExtensions.Get<TModel>(Connection, Number);
        }

        public virtual IEnumerable<TModel> GetAll()
        {
            return Connection.GetAll<TModel>();
        }

        #endregion Get

        #region Insert

        public int Insert(TModel obj, IUnitOfWorkBase uow = null)
        {
            return (int)Connection.Insert(obj, uow?.Transaction);
        }

        public int Insert(IEnumerable<TModel> list, IUnitOfWorkBase uow = null)
        {
            return (int)Connection.Insert(list, uow?.Transaction);
        }

        #endregion Insert

        #region Update

        public bool Update(TModel obj, IUnitOfWorkBase uow = null)
        {
            return Connection.Update(obj, uow?.Transaction);
        }

        public bool Update(IEnumerable<TModel> list, IUnitOfWorkBase uow = null)
        {
            return Connection.Update(list, uow?.Transaction);
        }

        #endregion Update


        /// <summary>
        /// 取TEntity的TableName
        /// </summary>
        protected string GetTableNameMapper()
        {
            dynamic attributeTable = typeof(TModel).GetCustomAttributes(false)
                .FirstOrDefault(attr => attr.GetType().Name == "TableAttribute");

            return attributeTable != null ? attributeTable.Name : typeof(TModel).Name;
        }

        /// <summary>
        /// 動態Where查詢資料表
        /// <para> TSearch可自定義Property的Attribute </para>
        /// <para> WhereColumnNameAttribute: 查詢欄位, 預設為Property.Name </para>
        /// <para> WhereOperatorAttribute: 運算符號, 預設為等號 </para>
        /// </summary>
        /// <typeparam name="TSearch"></typeparam>
        /// <param name="searchModel"></param>
        /// <returns></returns>
        public virtual IEnumerable<TModel> QuerySearch<TSearch>(TSearch searchModel)
        {
            string sql =
                $@"
                    SELECT *
                    FROM {GetTableNameMapper()}
                    /**where**/
                    /**orderby**/
                ";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql);

            GenerateWhereConditionClause(builder, searchModel);

            builder.OrderBy("(SELECT NULL)");

            return Connection.Query<TModel>(template.RawSql, template.Parameters);
        }

        /// <summary>
        /// 動態Where查詢資料表
        /// <para> TSearch可自定義Property的Attribute </para>
        /// <para> WhereColumnNameAttribute: 查詢欄位, 預設為Property.Name </para>
        /// <para> WhereOperatorAttribute: 運算符號, 預設為等號 </para>
        /// </summary>
        /// <typeparam name="TSearch"></typeparam>
        /// <param name="searchModel"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        public Tuple<IEnumerable<TModel>, int> QuerySearchPaginated<TSearch>(TSearch searchModel, PaginationWithSortedQueryModel paginated = null)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} /**where**/";
            string sql = $@"
                WITH _data AS (
                    {sqlSelect}
                )
                SELECT * FROM _data
                /**orderby**/
                {(paginated.IsAll
                    ? ""
                    : @"OFFSET (@page - 1) * @pageSize ROWS
                        FETCH NEXT @pageSize ROWS ONLY")};

                WITH _data AS (
                    {sqlSelect}
                )
                SELECT COUNT(*) FROM _data;";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql);

            if (!paginated.IsAll)
            {
                builder.AddParameters(new { paginated.Page, paginated.PageSize });
            }

            GenerateWhereConditionClause(builder, searchModel);

            if (!string.IsNullOrEmpty(paginated?.SortedColumn))
            {
                if (paginated.SortedType == (int)Common.Enums.SortedType.DESC)
                {
                    builder.OrderBy(paginated.SortedColumn + " DESC");
                }
                else
                {
                    builder.OrderBy(paginated.SortedColumn);
                }
            }
            else
            {
                builder.OrderBy("(SELECT NULL)");
            }

            var result = Connection.QueryMultiple(template.RawSql, template.Parameters);
            IEnumerable<TModel> results = result.Read<TModel>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<TModel>, int>(results, totalCount);
        }

        /// <summary>
        /// Create SQL Where Clause
        /// <para>Get whereOperatorAttribute on searchModel's property</para>
        /// <para>then know the operator (=, &lt;, &gt;, LIKE...)</para>
        /// </summary>
        /// <param name="builder"></param>
        /// <param name="property"></param>
        /// <param name="obj"></param>
        public void GenerateWhereConditionClause<TSearch>(SqlBuilder builder, TSearch searchModel)
        {
            PropertyInfo[] properties = typeof(TSearch).GetProperties();

            DynamicParameters dynamicParameters = new DynamicParameters();
            foreach (PropertyInfo property in properties)
            {
                object value = property.GetValue(searchModel, null);
                if (value == null) continue;
                TypeCode typeCode = Type.GetTypeCode(property.PropertyType);
                switch (typeCode)
                {
                    case TypeCode.String:
                        if ((string)value == "") continue;
                        break;
                    case TypeCode.Object:
                        if (property.PropertyType.IsGenericType && (value as ICollection).Count > 0) continue;
                        if (property.PropertyType.IsArray && (value as Array).Length > 0) continue;
                        break;
                }

                object[] columnNameAttrs = property.GetCustomAttributes(typeof(WhereColumnNameAttribute), false);
                string columnName = (columnNameAttrs.Length > 0) ? ((WhereColumnNameAttribute)columnNameAttrs[0]).ColumnName : property.Name;
                object[] operatorAttrs = property.GetCustomAttributes(typeof(WhereOperatorAttribute), false);
                string whereOperator = (operatorAttrs.Length > 0) ? ((WhereOperatorAttribute)operatorAttrs[0]).Operator : TSqlOperator.EqualTo;

                dynamicParameters.Add(
                    property.Name,
                    whereOperator == TSqlOperator.Like ? $"%{value}%" : value
                );

                builder.Where($"{columnName} {whereOperator} @{property.Name}");
            }
            builder.AddParameters(dynamicParameters);
        }
    }
}
