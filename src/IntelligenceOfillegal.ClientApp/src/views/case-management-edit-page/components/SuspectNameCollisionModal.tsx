import { Modal } from '@src/components/modal';
import { usePageActionContext, usePageStateContext } from '../context';
import { CaseManagementModel } from '../types';
import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';
import { useNavigation } from '@src/libs/router';
import { RoutePath } from '@src/app';

export const SuspectNameCollisionModal = () => {
  const {
    isShowSuspectNameCollisionModal,
    intelligenceOfillegalCollisionPkField,
    intelligenceOfillegalCollisionPaginatedGridData,
    intelligenceOfillegalCollisionPaginatedInfoModel,
    intelligenceOfillegalCollisionSortedModel,
    collisionSuspectName,
  } = usePageStateContext();
  const {
    closeSuspectNameCollisionModal,
    handleIntelligenceOfillegalCollisionPageChange,
    handleIntelligenceOfillegalCollisionSortChange,
  } = usePageActionContext();

  const navigation = useNavigation();
  return (
    <Modal show={isShowSuspectNameCollisionModal} size="xl">
      <Modal.Header>
        <Modal.Title>查詢結果</Modal.Title>
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            closeSuspectNameCollisionModal();
          }}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Header>
            <h4>不法情資系統-對象姓名比對結果({collisionSuspectName})</h4>
          </Card.Header>
          <Card.Body>
            <DataGrid.Table<CaseManagementModel, number>
              pkField={intelligenceOfillegalCollisionPkField}
              keyExtractor={(rowData) => `${rowData.seq}`}
              columnDefs={[
                { field: 'caseCategory', text: '分案類別' },
                { field: 'intelligenceNo', text: '不法情資編號', isSortable: false },
                { field: 'itlgSrcCaseName', text: '案名', isSortable: false },
                { field: 'supervisorDepartment', text: '承辦科', isSortable: false },
                { field: 'itlgSrcSupervisorId', text: '承辦人', isSortable: false },
                { field: 'createTime', text: '提報日期', isSortable: false },
                { field: 'investigateProgressCode', text: '調查進度', isSortable: false },
              ]}
              data={intelligenceOfillegalCollisionPaginatedGridData}
              sortedModel={intelligenceOfillegalCollisionSortedModel}
              onSortChange={handleIntelligenceOfillegalCollisionSortChange}
              //isLoading={isLoading}
              renderRow={(rowData) => (
                <>
                  <td>{rowData.caseCategory}</td>
                  <DataGrid.Column>
                    <li
                      className="list-group-item"
                      onClick={() => {
                        closeSuspectNameCollisionModal();
                        navigation.replace(`${RoutePath.CASE_MANAGEMENT_EDIT}/${rowData.seq}`);
                      }}
                    >
                      {rowData.intelligenceNo}
                    </li>
                  </DataGrid.Column>
                  <td>{rowData.itlgSrcCaseName}</td>
                  <td>{rowData.supervisorDepartment}</td>
                  <td>{rowData.itlgSrcSupervisorId}</td>
                  <td>{rowData.createTime}</td>
                  <td>{rowData.investigateProgressCode}</td>
                </>
              )}
            />
          </Card.Body>
          <Card.Footer>
            <DataGrid.Pagination
              paginatedInfoModel={intelligenceOfillegalCollisionPaginatedInfoModel}
              onPageChange={handleIntelligenceOfillegalCollisionPageChange}
              //disabled={isLoading}
            />
          </Card.Footer>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            closeSuspectNameCollisionModal();
          }}
        >
          取消
        </button>
      </Modal.Footer>
    </Modal>
  );
};
