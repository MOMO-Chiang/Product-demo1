import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';
import { usePageActionContext, usePageStateContext } from '../context';
import { CaseManagementModel } from '../types';
import { useNavigation } from '@src/libs/router';

import { RoutePath } from '@src/app';
import { Alert } from '@src/libs/alert';
import { createCaseManagementList, deleteCaseManagementList } from '../case-management.service';

export const TableCard = () => {
  const { isLoading, pkField, paginatedInfoModel, gridData, sortedModel } = usePageStateContext();
  const { handleSortChange, handlePageSizeChange, handlePageChange, initPageData } = usePageActionContext();
  const deleteCaseManagement = async (seq: string) => {
    const isConfirmed = await Alert.show({ type: Alert.AlertType.Warning, title: '確定要刪除此情資' });
    if (isConfirmed) {
      await deleteCaseManagementList(seq);
      Alert.showSuccess('刪除成功');
      initPageData();
    }
  };
  const navigation = useNavigation();
  return (
    <Card>
      <Card.Header>
        <DataGrid.PageSizeSelect pageSize={paginatedInfoModel.pageSize} onChange={handlePageSizeChange} />
        <button
          type="button"
          className="btn btn-primary btn-width-lg"
          onClick={async () => {
            const seq = await createCaseManagementList();
            navigation.replace(`${RoutePath.CASE_MANAGEMENT_EDIT}/${seq}`);
          }}
        >
          新增
        </button>
      </Card.Header>
      <Card.Body>
        <DataGrid.Table<CaseManagementModel, number>
          pkField={pkField}
          keyExtractor={(rowData) => `${rowData.seq}`}
          columnDefs={[
            { field: 'action', text: '編輯', className: '' },
            { field: 'caseDistributeUnit', text: '分案人單位', isSortable: true, className: 'text-primary' },
            { field: 'caseCategory', text: '分案類別', isSortable: true, className: 'text-primary' },
            { field: 'intelligenceNo', text: '不法情資編號', isSortable: true, className: '' },
            {
              field: 'investigateProgressCode',
              text: '調查進度',
              isSortable: true,
              className: '',
            },
            { field: 'itlgSrcCaseName', text: '主旨', isSortable: true, className: 'text-primary' },
            { field: 'mainSuspectName', text: '主要對象', isSortable: true, className: 'text-primary' },
            { field: 'itlgSrcReportUnitCode', text: '提報單位', isSortable: true, className: 'text-primary' },
            { field: 'createTime', text: '提報日期', isSortable: true, className: 'text-primary' },
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
                  onClick={() => {
                    navigation.replace(`${RoutePath.CASE_MANAGEMENT_EDIT}/${rowData.seq}`);
                  }}
                  style={{ marginRight: '5px' }}
                >
                  <i className="fas fa-pen" />
                </button>

                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    deleteCaseManagement(rowData.seq.toString());
                  }}
                >
                  <i className="fas fa-trash" />
                </button>
              </DataGrid.Column>
              <td>{rowData.caseDistributeUnit}</td>
              <td>{rowData.caseCategory}</td>
              <td>{rowData.intelligenceNo}</td>
              <td>{rowData.investigateProgressCode}</td>
              <td>{rowData.itlgSrcCaseName}</td>
              <td>{rowData.mainSuspectName}</td>
              <td>{rowData.itlgSrcReportUnitCode}</td>
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
