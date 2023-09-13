import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';
import { usePageActionContext, usePageStateContext } from '../context';
import { Alert } from '@src/libs/alert';
import { UploadFileList } from '../types';

export const UploadFileTableCard = () => {
  const { isLoading, pkField, paginatedInfoModel, paginatedGridData, sortedModel } = usePageStateContext();
  const { handleSortChange, handlePageChange, UploadFile, DeteleFile } = usePageActionContext();
  const ConfirmedDeteleFile = async (seq: number) => {
    const isConfirmed = await Alert.show({ type: Alert.AlertType.Warning, title: '確定要刪除此檔案' });
    if (isConfirmed) {
      DeteleFile(seq);
    }
  };
  return (
    <Card>
      <Card.Header>
        <h4>上傳檔案列表</h4>
        <div>
          <input id="uploadFile" type="file" className="btn-check" onChange={UploadFile} />
          <label htmlFor="uploadFile" className="btn btn-primary" style={{ marginRight: '5px' }}>
            上傳新檔案
          </label>
          <button className="btn btn-primary">操作大額交易金流圖</button>
        </div>
      </Card.Header>
      <Card.Body>
        <DataGrid.Table<UploadFileList, number>
          pkField={pkField}
          keyExtractor={(rowData) => `${rowData.seq}`}
          columnDefs={[
            { field: 'action', text: '刪除' },
            { field: 'seq', text: '檔案編號', isSortable: false },
            { field: 'originFileName', text: '檔案名稱', isSortable: false },
            { field: 'createPersonId', text: '上傳人員五碼', isSortable: false },
            { field: 'createTime', text: '上傳時間', isSortable: false },
          ]}
          data={paginatedGridData}
          sortedModel={sortedModel}
          onSortChange={handleSortChange}
          isLoading={isLoading}
          renderRow={(rowData) => (
            <>
              <DataGrid.Column>
                <label
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    ConfirmedDeteleFile(rowData.seq);
                  }}
                >
                  <i className="fas fa-trash" />
                </label>
              </DataGrid.Column>
              <td>{rowData.seq}</td>
              <td>{rowData.originFileName}</td>
              <td>{rowData.createPersonId}</td>
              <td>{rowData.createTime}</td>
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
