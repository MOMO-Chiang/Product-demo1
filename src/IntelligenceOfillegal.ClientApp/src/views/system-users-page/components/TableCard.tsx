import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';
import { usePageActionContext, usePageStateContext } from '../context';
import { SystemUsersModel, PERMISSION_OPTION } from '../types';
import { FormGroup } from '@src/components/form';

export const TableCard = () => {
  const { isLoading, pkField, paginatedInfoModel, gridData, sortedModel } = usePageStateContext();
  const { handleSortChange, handlePageSizeChange, handlePageChange, handleEditBtnClick, handleValidChange } =
    usePageActionContext();

  /** 身分別功能權限 */
  const GetPermission = (permission:string) =>{
    const fi = PERMISSION_OPTION.find((item)=>item.value == permission);
    if(fi != null) return fi?.text;
    else return '無權限';
    };

    const de = () =>{
      };

  return (
    <Card>
      <Card.Header>
        <DataGrid.PageSizeSelect pageSize={paginatedInfoModel.pageSize} onChange={handlePageSizeChange} />
      </Card.Header>
      <Card.Body>
        <DataGrid.Table<SystemUsersModel, string>
          pkField={pkField}
          keyExtractor={(rowData) => `${rowData.userId}`}
          columnDefs={[
            { field: 'action', text: '編輯' },
            { field: 'userId', text: '使用者帳號', isSortable: true },
            { field: 'userName', text: '使用者名稱', isSortable: true },
            { field: 'unitCode', text: '單位代碼', isSortable: true },
            { field: 'unitName', text: '單位名稱', isSortable: true },
            { field: 'isValid', text: '有效', isSortable: true },
            { field: 'permission', text: '身分別功能權限', isSortable: true },
            { field: 'createTime', text: '建立時間', isSortable: true },
            { field: 'updateUserId', text: '最後異動人員帳號', isSortable: true },
            { field: 'updateUserName', text: '最後異動人員名稱', isSortable: true },
            { field: 'updateTime', text: '最後異動時間', isSortable: true },
          ]}
          data={gridData}
          sortedModel={sortedModel}
          onSortChange={handleSortChange}
          isLoading={isLoading}
          renderRow={(rowData) => (
            <>
              <DataGrid.Column>
                <button
                  type="button"
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEditBtnClick(rowData)}
                >
                  <i className="fas fa-pen" />
                </button>
              </DataGrid.Column>
              <td>{rowData.userId}</td>
              <td>{rowData.userName}</td>
              <td>{rowData.unitCode}</td>
              <td>{rowData.unitName}</td>

              <td>
                <div className="col-12 col-sm-6 col-md-4">
                <FormGroup>
                <div className="form-check form-switch form-switch-lg">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="isValid"
                    name="isValid"
                    checked={rowData.isValid}
                    //onClick={()=>handleValidChange(rowData)}
                    disabled = {true}
                  />
                </div>
                </FormGroup>
                </div>
              </td>

              <td>{GetPermission(rowData.permission)}</td>
              <td>{rowData.createTime}</td>
              <td>{rowData.updateUserId}</td>
              <td>{rowData.updateUserName}</td>
              <td>{rowData.updateTime}</td>
            </>
          )}
        />
      </Card.Body>
      <Card.Footer>
        <DataGrid.Pagination
          paginatedInfoModel={paginatedInfoModel}
          onPageChange={handlePageChange}
          disabled={isLoading}
        />
      </Card.Footer>
    </Card>
  );
};
