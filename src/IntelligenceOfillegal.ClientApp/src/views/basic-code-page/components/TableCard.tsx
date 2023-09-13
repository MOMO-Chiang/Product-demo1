import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';
import { usePageActionContext, usePageStateContext } from '../context';
import { BasicCodeModel } from '../types';
import { FormGroup, Select } from '@src/components/form';

export const TableCard = () => {
  const { isLoading, pkField, paginatedInfoModel, gridData, sortedModel, categoryCodeSelectOptions } = usePageStateContext();
  const { handleSortChange, handlePageSizeChange, handlePageChange, handleSearchFormSubmit, 
    handleBasicCodeCreateBtnClick, handleBasicCodeEditBtnClick, handleActivedChange } =
    usePageActionContext();
    
  /** 類別項目切換 查詢基礎代碼 */
  const selectOnChangeSubmit = async (data: string) => {
    await handleSearchFormSubmit({
      category: '0',
      categoryCode: data, 
    });
  };

  /** 修改編輯按鈕 */
  const rendetColumn = (rowData: BasicCodeModel) => {
    if(rowData.isActived)
    {
      return(
        <DataGrid.Column>
              <button
                type="button"
                className="btn btn-warning btn-sm"
                onClick={() => handleBasicCodeEditBtnClick(rowData)}
              >
              <i className="fas fa-pen" />
              </button>
              </DataGrid.Column>
        );
    }
    else{
      return(
        <DataGrid.Column>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleBasicCodeEditBtnClick(rowData)}
              >
              <i className="fas fa-trash" />
              </button>
            </DataGrid.Column>
      );
    }
  };

  return (
    <Card>
      <Card.Header>
       <div className="row">
         <div className="d-flex" style={{ alignItems: 'center' }}>
           <label style={{ width: '120px' }}>類別名稱</label>
           <Select
              id="categoryCode"
              name="categoryCode"
                //defaultValue={'0'}
                options={categoryCodeSelectOptions}
                onChange={(e)=> {selectOnChangeSubmit(e.target.value)}}
            />
          </div>
        </div>
        <DataGrid.PageSizeSelect pageSize={paginatedInfoModel.pageSize} onChange={handlePageSizeChange} />
        <button type='button' className='btn btn-primary btn-width-lg' onClick={handleBasicCodeCreateBtnClick}>新增</button> 
      </Card.Header>
      <Card.Body>
        <DataGrid.Table<BasicCodeModel, string>
          pkField={pkField}
          keyExtractor={(rowData) => `${rowData.value}`}
          columnDefs={[
            { field: 'action', text: '編輯' },
            { field: 'seq', text: '流水號', isSortable: true },
            { field: 'category', text: '類別名稱', isSortable: true },
            { field: 'categoryCode', text: '類別代碼', isSortable: true },
            { field: 'text', text: '顯示名稱', isSortable: true },
            { field: 'isActived', text: '啟用', isSortable: true },
            { field: 'value', text: '顯示名稱代碼', isSortable: true },
            { field: 'updatePersonId', text: '資料異動人員五碼', isSortable: true },
            { field: 'updateTime', text: '資料異動時間', isSortable: true },
            { field: 'createPersonId', text: '資料建立人員五碼', isSortable: true },
            { field: 'createTime', text: '資料建立時間', isSortable: true },
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
                  onClick={() => handleBasicCodeEditBtnClick(rowData)}
                >
                  <i className="fas fa-pen" />
                </button>
              </DataGrid.Column>
              <td>{rowData.seq}</td>
              <td>{rowData.category}</td>
              <td>{rowData.categoryCode}</td>
              <td>{rowData.text}</td>
              <td>
                <div className="col-12 col-sm-6 col-md-4">
                <FormGroup>
                <div className="form-check form-switch form-switch-lg">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="isActived"
                    name="isActived"
                    checked={rowData.isActived}
                    //onClick={()=>handleActivedChange(rowData)}
                    disabled = {true}
                  />
                </div>
                </FormGroup>
                </div>
              </td>
              <td>{rowData.value}</td>
              <td>{rowData.updatePersonId}</td>
              <td>{rowData.updateTime}</td>
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
