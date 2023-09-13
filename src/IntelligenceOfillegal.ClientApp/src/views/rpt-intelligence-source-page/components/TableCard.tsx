import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';
import { usePageActionContext, usePageStateContext } from '../context';
import { RptIntelligenceSourceModel } from '../types';

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
        <DataGrid.Table<RptIntelligenceSourceModel, number>
          pkField={pkField}
          keyExtractor={(rowData, index) => `${rowData.unitCode}-newSeq-${index}`}
          columnDefs={[
            { field: 'unitName', text: '情資來源', isSortable: true },
            { field: 'totalCount', text: '件數', isSortable: true },
          ]}
          data={gridData}
          sortedModel={sortedModel}
          onSortChange={handleSortChange}
          isLoading={isLoading}
          renderRow={(rowData) => (
            <>
              <td>{rowData.unitName}</td>
              <td>{rowData.totalCount}</td>
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
