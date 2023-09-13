import { useEffect } from 'react';
import { FormGroup, Label, Input, useForm, Checkbox, DatePicker, Select } from '@src/components/form';
import { Modal } from '@src/components/modal';
import { usePageActionContext, usePageStateContext } from '../context';
import {
  CaseManagementTransferHistory,
  CaseManagementTransferHistoryCreateParams,
  ObjPerson,
} from '../types';
import { Card } from '@src/components/card';
import { DataGrid } from '@src/components/data-grid';

export const CaseManagementTransferModal = () => {
  const {
    isShowCaseManagementTransferModal,
    caseManagementModel,
    caseManagementTransferHistoryPkField,
    supervisorSelectOptions,
    caseManagementTransferHistoryPaginatedGridData,
    caseManagementTransferHistoryPaginatedInfoModel,
    caseManagementTransferHistorySortedModel,
  } = usePageStateContext();
  const {
    closeCaseManagementTransferModal,
    CaseManagementTransfer,
    handleCaseManagementTransferHistoryPageChange,
    handleCaseManagementTransferHistorySortChange,
  } = usePageActionContext();
  const { formData, updateFormData } = useForm<CaseManagementTransferHistoryCreateParams>({
    newPersonId: { initialValue: '', validate: () => ({}) },
    newPersonName: { initialValue: '', validate: () => ({}) },
    intelligenceCaseId: { initialValue: '', validate: () => ({}) },
  });

  useEffect(() => {
    updateFormData({
      intelligenceCaseId: caseManagementModel.intelligenceCaseId,
    });
  }, [caseManagementModel]);
  return (
    <Modal show={isShowCaseManagementTransferModal} size="xl">
      <Modal.Header>
        <Modal.Title>情資轉移歷程資料</Modal.Title>
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            closeCaseManagementTransferModal();
          }}
        ></button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-1" style={{ marginTop: '5px', marginRight: '10px' }}>
            <Label htmlFor="newPersonId">選擇新承辦人</Label>
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <Select
              id="newPersonId"
              name="newPersonId"
              value={formData.newPersonId}
              onChange={(e) =>
                updateFormData({
                  newPersonId: e.target.value,
                  newPersonName:
                    e.target.selectedOptions[0].textContent == null
                      ? ''
                      : e.target.selectedOptions[0].textContent,
                })
              }
              options={supervisorSelectOptions}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => CaseManagementTransfer(formData)}
            >
              開始移轉情資
            </button>
          </div>
        </div>

        <div style={{ marginTop: '10px' }}>
          <DataGrid.Table<CaseManagementTransferHistory, number>
            pkField={caseManagementTransferHistoryPkField}
            keyExtractor={(rowData) => `${rowData.seq}`}
            columnDefs={[
              { field: 'seq', text: '流水號', isSortable: true },
              { field: 'originPersonId', text: '原始承辦人五碼', isSortable: false },
              { field: 'newPersonId', text: '情資新承辦人五碼', isSortable: false },
              { field: 'updateTime', text: '資料異動時間', isSortable: false },
              { field: 'updateUser', text: '資料異動人員五碼', isSortable: false },
            ]}
            data={caseManagementTransferHistoryPaginatedGridData}
            sortedModel={caseManagementTransferHistorySortedModel}
            onSortChange={handleCaseManagementTransferHistorySortChange}
            //isLoading={isLoading}
            renderRow={(rowData) => (
              <>
                <td>{rowData.seq}</td>
                <td>{rowData.originPersonId}</td>
                <td>{rowData.newPersonId}</td>
                <td>{rowData.updateTime}</td>
                <td>{rowData.updateUser}</td>
              </>
            )}
          />

          <DataGrid.Pagination
            paginatedInfoModel={caseManagementTransferHistoryPaginatedInfoModel}
            onPageChange={handleCaseManagementTransferHistoryPageChange}
            //disabled={isLoading}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            closeCaseManagementTransferModal();
          }}
        >
          取消
        </button>
      </Modal.Footer>
    </Modal>
  );
};
