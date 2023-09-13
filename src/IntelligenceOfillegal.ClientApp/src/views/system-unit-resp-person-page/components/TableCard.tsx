import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';
import { usePageActionContext, usePageStateContext } from '../context';
import { SystemUnitRespPersonModel } from '../types';

export const TableCard = () => {
  const { isLoading, pkField, paginatedInfoModel, gridData, sortedModel } = usePageStateContext();
  const {
    handleSortChange,
    handlePageSizeChange,
    handlePageChange,
    handleCreateBtnClick,
    handleEditBtnClick,
    handleDeleteBtnClick,
  } = usePageActionContext();

  return (
    <Card>
      <Card.Header>
        <DataGrid.PageSizeSelect pageSize={paginatedInfoModel.pageSize} onChange={handlePageSizeChange} />
        {/* <button type="button" className="btn btn-primary btn-width-lg" onClick={handleCreateBtnClick}>
          新增
        </button> */}
      </Card.Header>
      <Card.Body>
        <DataGrid.Table<SystemUnitRespPersonModel, number>
          pkField={pkField}
          keyExtractor={(rowData) => `${rowData.seq}`}
          columnDefs={[
            { field: 'action', text: '編輯', className: 'text-primary' },
            {
              field: 'systemPlatformUnitName',
              text: '系統管理員單位',
              isSortable: true,
              className: 'text-primary',
            },
            { field: 'unitCode', text: '單位代碼(轄區)', isSortable: true, className: 'text-primary' },
            { field: 'unitName', text: '單位名稱(轄區)', isSortable: true, className: 'text-primary' },
            { field: 'responsiblePerson1', text: '局承辦人-1', isSortable: true, className: 'text-primary' },
            { field: 'responsiblePerson2', text: '局承辦人-2', isSortable: true, className: 'text-primary' },
            { field: 'responsiblePerson3', text: '局承辦人-3', isSortable: true, className: 'text-primary' },
            { field: 'updateUserId', text: '最後異動人員帳號', isSortable: true, className: 'text-primary' },
            {
              field: 'updateUserName',
              text: '最後異動人員名稱',
              isSortable: true,
              className: 'text-primary',
            },
            { field: 'updateTime', text: '最後異動時間', isSortable: true, className: 'text-primary' },
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
                {/* <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteBtnClick(rowData)}
                >
                  <i className="fas fa-trash" />
                </button> */}
              </DataGrid.Column>
              <td>{rowData.systemPlatformUnitName}</td>
              <td>{rowData.unitCode}</td>
              <td>{rowData.unitName}</td>
              <td>{rowData.responsiblePerson1}</td>
              <td>{rowData.responsiblePerson2}</td>
              <td>{rowData.responsiblePerson3}</td>
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
