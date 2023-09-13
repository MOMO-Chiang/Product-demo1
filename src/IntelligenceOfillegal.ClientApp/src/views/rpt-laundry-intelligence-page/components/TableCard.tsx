import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';
import { usePageActionContext, usePageStateContext } from '../context';
import { RptLaundryIntelligenceModel } from '../types';

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
        <DataGrid.Table<RptLaundryIntelligenceModel, number>
          pkField={pkField}
          keyExtractor={(rowData) => `${rowData.seq}`}
          columnDefs={[
            { field: 'seq', text: '項次', isSortable: true },
            { field: 'itlgSrcUnitName', text: '來源單位', isSortable: true },
            { field: 'intelligenceNo', text: '新流水號', isSortable: true },
            { field: 'itlgSrcCreateFileDate', text: '分送日期' },
            { field: 'itlgSrcFileNo', text: '來源字號' },
            { field: 'mainCaseTypeName', text: '案件類別' },
            { field: 'electionItlgNotes', text: '選舉情資註記' },
            { field: 'itlgSrcSupervisorId', text: '承辦人' },
            { field: 'createTime', text: '提報日期' },
            { field: 'receiveReportNum', text: '公文字號' },
            { field: 'itlgSrcCaseName', text: '內容摘要' },
            { field: 'investigateProgressName', text: '處理情形' },
            { field: 'supervisorDepartmentName', text: '承辦科' },
          ]}
          data={gridData}
          sortedModel={sortedModel}
          onSortChange={handleSortChange}
          isLoading={isLoading}
          renderRow={(rowData) => (
            <>
              <td>{rowData.seq}</td>
              <td>{rowData.itlgSrcUnitName}</td>
              <td>{rowData.intelligenceNo}</td>
              <td>{rowData.itlgSrcCreateFileDate}</td>
              <td>{rowData.itlgSrcFileNo}</td>
              <td>{rowData.mainCaseTypeName}</td>
              <td>{rowData.electionItlgNotes}</td>
              <td>{rowData.itlgSrcSupervisorId}</td>
              <td>{rowData.createTime}</td>
              <td>{rowData.receiveReportNum}</td>
              <td>{rowData.itlgSrcCaseName}</td>
              <td>{rowData.investigateProgressName}</td>
              <td>{rowData.supervisorDepartmentName}</td>
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
