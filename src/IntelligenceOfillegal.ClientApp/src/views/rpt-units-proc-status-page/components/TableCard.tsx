import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';
import { usePageActionContext, usePageStateContext } from '../context';
import { RptUnitsProcStatusModel } from '../types';

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
        <DataGrid.Table<RptUnitsProcStatusModel, number>
          pkField={pkField}
          keyExtractor={(rowData, index) => `${rowData.unitCode}-newSeq-${index}`}
          columnDefs={[
            { field: 'unitName', text: '單位', isSortable: true },
            { field: 'totalCount', text: '總件數', isSortable: true },
            { field: 'underSigning', text: '簽辦中', isSortable: true },
            { field: 'assignToFieldwork', text: '發交外勤' },
            { field: 'assignToInvestigation', text: '發查' },
            { field: 'fileForReference', text: '存查' },
            { field: 'mergeCase', text: '併案' },
            { field: 'assistToInvestigation', text: '協查' },
          ]}
          data={gridData}
          sortedModel={sortedModel}
          onSortChange={handleSortChange}
          isLoading={isLoading}
          renderRow={(rowData) => (
            <>
              <td>{rowData.unitName}</td>
              <td>{rowData.totalCount}</td>
              <td>{rowData.underSigning ?? 0}</td>
              <td>{rowData.assignToFieldwork ?? 0}</td>
              <td>{rowData.assignToInvestigation ?? 0}</td>
              <td>{rowData.fileForReference ?? 0}</td>
              <td>{rowData.mergeCase ?? 0}</td>
              <td>{rowData.assistToInvestigation ?? 0}</td>
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
