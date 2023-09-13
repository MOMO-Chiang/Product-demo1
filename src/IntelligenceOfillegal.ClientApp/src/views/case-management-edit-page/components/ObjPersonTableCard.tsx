import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';
import { usePageActionContext, usePageStateContext } from '../context';
import { Alert } from '@src/libs/alert';
import { Checkbox } from '@src/components/form';
import { ObjPerson } from '../types';

export const ObjPersonTableCard = () => {
  const {
    isLoading,
    objPersonPkField,
    objPersonPaginatedGridData,
    objPersonPaginatedInfoModel,
    objPersonSortedModel,
  } = usePageStateContext();
  const {
    handleobjPersonPageChange,
    handleobjPersonSortChange,
    openObjPersonCreateModal,
    DeteleObjPerson,
    openObjPersonEditModal,
  } = usePageActionContext();
  const ConfirmedDeteleObjPerson = async (seq: number) => {
    const isConfirmed = await Alert.show({ type: Alert.AlertType.Warning, title: '確定要刪除此對象清單' });
    if (isConfirmed) {
      DeteleObjPerson(seq);
    }
  };

  return (
    <Card>
      <Card.Header>
        <h4>所有對象清單</h4>
        <label className="btn btn-primary" onClick={openObjPersonCreateModal}>
          新增次要對象
        </label>
      </Card.Header>
      <Card.Body>
        <DataGrid.Table<ObjPerson, number>
          pkField={objPersonPkField}
          keyExtractor={(rowData) => `${rowData.seq}`}
          columnDefs={[
            { field: 'action', text: '編輯' },
            { field: 'isMainSuspect', text: '是否為主要對象', isSortable: false },
            { field: 'personName', text: '對象姓名', isSortable: false },
            { field: 'personID', text: '對象身分證號', isSortable: false },
            { field: 'isReportLink', text: '提列洗錢勾稽', isSortable: false },
            { field: 'createTime', text: '勾稽異動日', isSortable: false },
          ]}
          data={objPersonPaginatedGridData}
          sortedModel={objPersonSortedModel}
          onSortChange={handleobjPersonSortChange}
          isLoading={isLoading}
          renderRow={(rowData) => (
            <>
              <DataGrid.Column>
                <label
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    openObjPersonEditModal(rowData.seq);
                  }}
                  style={{ marginRight: '5px' }}
                >
                  <i className="fas fa-pen" />
                </label>
                <label
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    ConfirmedDeteleObjPerson(rowData.seq);
                  }}
                >
                  <i className="fas fa-trash" />
                </label>
              </DataGrid.Column>
              <td>
                {rowData.isMainSuspect ? (
                  <i className="fas fa-star text-info" style={{ marginLeft: '40px' }}></i>
                ) : (
                  ''
                )}
              </td>
              <td>{rowData.personName}</td>
              <td>{rowData.personID}</td>
              <td>
                <Checkbox
                  id="isReportLink"
                  name="isReportLink"
                  checked={rowData.isReportLink}
                  disabled
                  className="form-switch"
                />
              </td>
              <td>{rowData.createTime}</td>
            </>
          )}
        />
      </Card.Body>
      <Card.Footer>
        <DataGrid.Pagination
          paginatedInfoModel={objPersonPaginatedInfoModel}
          onPageChange={handleobjPersonPageChange}
          disabled={isLoading}
        />
      </Card.Footer>
    </Card>
  );
};
