import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';
import { usePageActionContext, usePageStateContext } from '../context';
import { ExternalIntelligenceModel } from '../types';
import { useNavigation } from '@src/libs/router';
import { RoutePath } from '@src/app';

export const TableCard = () => {
  const { isLoading, pkField, paginatedInfoModel, gridData, sortedModel } = usePageStateContext();
  const { handleSortChange, handlePageSizeChange, handlePageChange } = usePageActionContext();
  const navigation = useNavigation();
  return (
    <Card>
      <Card.Header>
        <DataGrid.PageSizeSelect pageSize={paginatedInfoModel.pageSize} onChange={handlePageSizeChange} />
      </Card.Header>
      <Card.Body>
        <DataGrid.Table<ExternalIntelligenceModel, number>
          pkField={pkField}
          keyExtractor={(rowData) => `${rowData.seq}`}
          columnDefs={[
            { field: 'action', text: '操作', className: 'text-primary' },
            { field: 'IntelligenceNo', text: '國內處情資編號', isSortable: true, className: 'text-primary' },
            { field: 'SupervisorName', text: '國內處承辦人', isSortable: true, className: 'text-primary' },
            { field: 'FileNo', text: '國情文號(原國內處檔號)', isSortable: true, className: 'text-primary' },
            { field: 'CaseNo', text: '國內處案號', isSortable: true, className: 'text-primary' },
            { field: 'CaseName', text: '國內處案名', isSortable: true, className: 'text-primary' },
            { field: 'CreateFileDate', text: '建檔日期', isSortable: true, className: 'text-primary' },
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
                    navigation.push(RoutePath.SRC_DOMESTIC_EDIT + '/' + rowData.intelligenceNo);
                  }}
                >
                  <i className="fas fa-pen" />
                </button>
              </DataGrid.Column>
              <td>{rowData.intelligenceNo}</td>
              <td>{rowData.supervisorName}</td>
              <td>{rowData.fileNo}</td>
              <td>{rowData.caseNo}</td>
              <td>{rowData.caseName}</td>
              <td>{rowData.createFileDate}</td>
              {/* <td>{rowData.qRequestJSON}</td>
              <td>{rowData.qResponseJSON_Standard}</td> */}
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
