using Dapper;
using IntelligenceOfillegal.Core.DbConnectionFactory;
using IntelligenceOfillegal.Core.Entities;
using IntelligenceOfillegal.Core.Models;
using IntelligenceOfillegal.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Dapper.SqlBuilder;

namespace IntelligenceOfillegal.Core.Repositories
{
    public class SysUserListRepository : RepositoryBase<SysUserList>, ISysUserListRepository
    {
        public SysUserListRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public Tuple<IEnumerable<SysUserList>, int> SearchPaginated(SystemUsersSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} /**where**/";

            string sql = $@"
                    WITH _data AS (
                        {sqlSelect}
                    )
                    SELECT * FROM _data
                    /**orderby**/
                    OFFSET (@page - 1) * @pageSize ROWS
                    FETCH NEXT @pageSize ROWS ONLY;

                    WITH _data AS (
                        {sqlSelect}
                    )
                    SELECT COUNT(*) FROM _data;";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql, new { paginated.Page, paginated.PageSize });

            if (entity.UserId != null)
            {
                builder.Where($"UserId like @UserId", new { UserId = "%" + entity.UserId + "%" });
            }
            if (entity.UserName != null)
            {
                builder.Where($"UserName like @UserName", new { UserName = "%" + entity.UserName + "%" });
            }
            if (entity.UnitCode != null)
            {
                builder.Where($"UnitCode = @UnitCode", new { entity.UnitCode });
            }
            if (entity.UnitName != null)
            {
                builder.Where($"UnitName like @UnitName", new { UnitName = "%" + entity.UnitName + "%" });
            }
            if (entity.Permission != 0)
            {
                builder.Where($"Permission = @Permission", new { entity.Permission });
            }

            if (!string.IsNullOrEmpty(paginated.SortedColumn))
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
            IEnumerable<SysUserList> results = result.Read<SysUserList>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<SysUserList>, int>(results, totalCount);
        }

        public void UpdateSysUserList(SystemUsersUpdateModel systemUsersUpdateModel)
        {
            string sqlSelect = $"UPDATE SysUserList SET IsValid = @IsValid , Permission = @Permission , " +
                               $"IsAdmin = @IsAdmin , UpdateUserId = @UpdateUserId, UpdateUserName = @UpdateUserName, " +
                               $"UpdateTime = @UpdateTime WHERE [UserId] = @UserId";
            Connection.Execute(sqlSelect, systemUsersUpdateModel);
        }

        public void UpdateIsValid(SystemUsersUpdateModel systemUsersUpdateModel)
        {
            string sqlSelect = $"UPDATE SysUserList SET IsValid = @IsValid , UpdateUserId = @UpdateUserId, " +
                               $"UpdateUserName = @UpdateUserName, UpdateTime = @UpdateTime WHERE [UserId] = @UserId";
            Connection.Execute(sqlSelect, systemUsersUpdateModel);
        }
    }
}
