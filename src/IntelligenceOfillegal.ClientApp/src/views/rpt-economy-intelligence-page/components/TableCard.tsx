import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';
import { usePageActionContext, usePageStateContext } from '../context';
import { RptEconomyIntelligenceModel } from '../types';

export const TableCard = () => {
  const { isLoading, pkField, paginatedInfoModel, gridData, sortedModel } = usePageStateContext();
  const { handleSortChange, handlePageSizeChange, handlePageChange, handleExportExcel } =
    usePageActionContext();

  return (
    <Card>
      <Card.Header>
        <DataGrid.PageSizeSelect pageSize={paginatedInfoModel.pageSize} onChange={handlePageSizeChange} />
        <button onClick={handleExportExcel} className="btn btn-primary px-3">
          下載Excel檔案
        </button>
      </Card.Header>
      <Card.Body>
        <DataGrid.Table<RptEconomyIntelligenceModel, number>
          pkField={pkField}
          keyExtractor={(rowData, index) => `${rowData.itlgSrcFileNo}-newSeq-${index}`}
          columnDefs={[
            { field: 'itlgSrcFileNo', text: '一處文號', isSortable: true },
            { field: 'itlgSrcCreateFileDate', text: '收文日期', isSortable: true },
            { field: 'intelligenceNo', text: '新流水號', isSortable: true },
            {
              field: 'itlgSrcCaseName',
              text: '主旨',
            },
            { field: 'itlgSrcSupervisorId', text: '主承辦人' },
            { field: 'supervisorId', text: '業務承辦人' },
            { field: 'investigateProgressName', text: '案件狀態' },
            { field: 'receiveReportNum', text: '公文號' },
            { field: 'itlgSrcReportUnitName', text: '來文單位' },
            { field: 'caseDistributeUnitName', text: '外勤單位' },
          ]}
          data={gridData}
          sortedModel={sortedModel}
          onSortChange={handleSortChange}
          isLoading={isLoading}
          renderRow={(rowData) => (
            <>
              <td>{rowData.itlgSrcFileNo}</td>
              <td>{rowData.itlgSrcCreateFileDate}</td>
              <td>{rowData.intelligenceNo}</td>
              <td>{rowData.itlgSrcCaseName}</td>
              <td>{rowData.itlgSrcSupervisorId}</td>
              <td>{rowData.supervisorId}</td>
              <td>{rowData.investigateProgressName}</td>
              <td>{rowData.receiveReportNum}</td>
              <td>{rowData.itlgSrcReportUnitName}</td>
              <td>{rowData.caseDistributeUnitName}</td>
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
