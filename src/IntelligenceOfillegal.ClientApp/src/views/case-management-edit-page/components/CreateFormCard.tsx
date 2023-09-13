import { FormGroup, Label, Input, useForm, DatePicker, Select, SearchableSelect } from '@src/components/form';
import { SearchButton } from '@src/components/search-button';
import { usePageActionContext, usePageStateContext } from '../context';
import { Card } from '@src/components/card';
import { UploadFileTableCard } from './UploadFileTableCard';
import { ObjPersonTableCard } from './ObjPersonTableCard';
import { useEffect } from 'react';
import { CaseManagementModel } from '../types';

export const CreateFormCard = () => {
  const {
    isLoading,
    caseManagementModel,
    downloadFileLists,
    itlgSrcUnitCodeSelectOptions,
    objectCategorySelectOptions,
    unitCodeSelectOptions,
    caseCategorySelectOptions,
    supervisorDepartmentSelectOptions,
    mainSuspectRoleSelectOptions,
    itlgInvolvedAgencySelectOptions,
    objectPersonSelectOptions,
    supervisorSelectOptions,
  } = usePageStateContext();
  const {
    handleUpdateFormSubmit,
    FilterItlgInvolvedAgencySelectOptions,
    DownloadFile,
    openSuspectNameCollisionModal,
  } = usePageActionContext();

  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<CaseManagementModel>({
    seq: { initialValue: '', validate: () => ({}) },
    intelligenceCaseId: { initialValue: '', validate: () => ({}) },
    intelligenceNo: { initialValue: '', validate: () => ({}) },
    investigateProgressCode: { initialValue: '', validate: () => ({}) },
    itlgSrcUnitCode: { initialValue: '', validate: () => ({}) },
    itlgSrcNo: { initialValue: '', validate: () => ({}) },
    objectCategory: { initialValue: '', validate: () => ({}) },
    createTime: { initialValue: '', validate: () => ({}) },
    receiveReportNum: { initialValue: '', validate: () => ({}) },
    itlgSrcReportUnitCode: { initialValue: '', validate: () => ({}) },
    itlgSrcReportNumber: { initialValue: '', validate: () => ({}) },
    itlgSrcTransReportPersonId: { initialValue: '', validate: () => ({}) },
    itlgInvolvedAgencyCode: { initialValue: '', validate: () => ({}) },
    mainSuspectName: { initialValue: '', validate: () => ({}) },
    mainSuspectId: { initialValue: '', validate: () => ({}) },
    caseCategory: { initialValue: '', validate: () => ({}) },
    supervisorDepartment: { initialValue: '', validate: () => ({}) },
    itlgSrcSupervisorName: { initialValue: '', validate: () => ({}) },
    itlgSrcSupervisorId: { initialValue: '', validate: () => ({}) },
    mainSuspectRole: { initialValue: '', validate: () => ({}) },
    itlgSrcCaseName: { initialValue: '', validate: () => ({}) },
    itlgSrcCaseAbstract: { initialValue: '', validate: () => ({}) },
    caseDistributeUnit: { initialValue: '', validate: () => ({}) },
    itlgSrcCreateFileDate: { initialValue: '', validate: () => ({}) },
    itlgSrcNumber: { initialValue: '', validate: () => ({}) },
  });

  useEffect(() => {
    updateFormData({
      seq: caseManagementModel.seq,
      intelligenceCaseId: caseManagementModel.intelligenceCaseId,
      intelligenceNo: caseManagementModel.intelligenceNo,
      investigateProgressCode: caseManagementModel.investigateProgressCode,
      itlgSrcUnitCode: caseManagementModel.itlgSrcUnitCode,
      itlgSrcNo: caseManagementModel.itlgSrcNo,
      objectCategory: caseManagementModel.objectCategory,
      createTime: caseManagementModel.createTime,
      receiveReportNum: caseManagementModel.receiveReportNum,
      itlgSrcReportUnitCode: caseManagementModel.itlgSrcReportUnitCode,
      itlgSrcReportNumber: caseManagementModel.itlgSrcReportNumber,
      itlgSrcTransReportPersonId: caseManagementModel.itlgSrcTransReportPersonId,
      itlgInvolvedAgencyCode: caseManagementModel.itlgInvolvedAgencyCode,
      mainSuspectName: caseManagementModel.mainSuspectName,
      mainSuspectId: caseManagementModel.mainSuspectId,
      caseCategory: caseManagementModel.caseCategory,
      supervisorDepartment: caseManagementModel.supervisorDepartment,
      itlgSrcSupervisorName: caseManagementModel.itlgSrcSupervisorName,
      itlgSrcSupervisorId: caseManagementModel.itlgSrcSupervisorId,
      mainSuspectRole: caseManagementModel.mainSuspectRole,
      itlgSrcCaseName: caseManagementModel.itlgSrcCaseName,
      itlgSrcCaseAbstract: caseManagementModel.itlgSrcCaseAbstract,
      caseDistributeUnit: caseManagementModel.caseDistributeUnit,
      itlgSrcCreateFileDate: caseManagementModel.itlgSrcCreateFileDate,
      itlgSrcNumber: caseManagementModel.itlgSrcNumber,
    });
  }, [caseManagementModel]);
  return (
    <Card style={{ backgroundColor: 'rgb(255, 242, 204)' }}>
      <Card.Header></Card.Header>
      <Card.Body>
        <form
          className="container-fluid"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateFormSubmit(formData);
          }}
        >
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="intelligenceNo">不法情資編號</Label>
                <Input
                  type="text"
                  id="intelligenceNo"
                  name="intelligenceNo"
                  onChange={(e) => updateFormData({ intelligenceNo: e.target.value })}
                  value={formData.intelligenceNo}
                  disabled={true}
                />
              </FormGroup>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="itlgSrcUnitCode" className="text-primary">
                  情資來源
                </Label>
                <Select
                  id="itlgSrcUnitCode"
                  name="itlgSrcUnitCode"
                  onChange={(e) => updateFormData({ itlgSrcUnitCode: e.target.value })}
                  value={formData.itlgSrcUnitCode}
                  disabled={isLoading}
                  options={itlgSrcUnitCodeSelectOptions}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="itlgSrcNo" className="text-primary">
                  情資來源編號
                </Label>
                <Input
                  type="text"
                  id="itlgSrcNo"
                  name="itlgSrcNo"
                  onChange={(e) => updateFormData({ itlgSrcNo: e.target.value })}
                  value={formData.itlgSrcNo}
                  disabled={isLoading}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="objectCategory" className="text-primary">
                  情資類別(原對象類別)
                </Label>
                <Select
                  id="objectCategory"
                  name="objectCategory"
                  onChange={(e) => updateFormData({ objectCategory: e.target.value })}
                  value={formData.objectCategory}
                  disabled={isLoading}
                  options={objectCategorySelectOptions}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="createTime" className="text-primary">
                  提報日期(分案時間)
                </Label>
                <DatePicker
                  id="createTime"
                  name="createTime"
                  format="yyyy/MM/dd"
                  placeholder="年/月/日"
                  onChange={(e) => updateFormData({ createTime: e })}
                  value={formData.createTime}
                  disabled={isLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="receiveReportNum">公文號</Label>
                <div className="input-group">
                  <Input
                    type="text"
                    id="receiveReportNum"
                    name="receiveReportNum"
                    onChange={(e) => updateFormData({ receiveReportNum: e.target.value })}
                    value={formData.receiveReportNum}
                    disabled={isLoading}
                  />
                  <button disabled={isLoading} className="btn btn-primary">
                    產生公文號
                  </button>
                </div>
              </FormGroup>
            </div>
          </div>

          <Card>
            <Card.Header style={{ backgroundColor: '#d3d3d3' }}>提報單位</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="itlgSrcReportUnitCode" className="text-primary">
                      單位代碼
                    </Label>
                    <Select
                      id="itlgSrcReportUnitCode"
                      name="itlgSrcReportUnitCode"
                      onChange={(e) => updateFormData({ itlgSrcReportUnitCode: e.target.value })}
                      value={formData.itlgSrcReportUnitCode}
                      disabled={isLoading}
                      options={unitCodeSelectOptions}
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="itlgSrcReportNumber">原報代號</Label>
                    <Input
                      type="text"
                      id="itlgSrcReportNumber"
                      name="itlgSrcReportNumber"
                      onChange={(e) => updateFormData({ itlgSrcReportNumber: e.target.value })}
                      value={formData.itlgSrcReportNumber}
                      disabled={isLoading}
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="itlgSrcTransReportPersonId" className="text-primary">
                      轉報人五碼(洗防處承辦人)
                    </Label>
                    <Input
                      type="text"
                      id="itlgSrcTransReportPersonId"
                      name="itlgSrcTransReportPersonId"
                      onChange={(e) => updateFormData({ itlgSrcTransReportPersonId: e.target.value })}
                      value={formData.itlgSrcTransReportPersonId}
                      disabled={isLoading}
                    />
                  </FormGroup>
                </div>
              </div>
            </Card.Body>
          </Card>
          <div className="row">
            <div className="col-12 col-sm-8 col-md-8">
              <FormGroup>
                <Label htmlFor="itlgInvolvedAgencyCode">
                  情資所涉機關名稱-表格連動{' '}
                  <span className="text-danger">若情資與機關無涉，請點選右鍵帶入【非屬以上機關】</span>
                </Label>
                <SearchableSelect
                  id="itlgInvolvedAgencyCode"
                  name="itlgInvolvedAgencyCode"
                  onChange={(e) => updateFormData({ itlgInvolvedAgencyCode: e })}
                  value={formData.itlgInvolvedAgencyCode}
                  disabled={isLoading}
                  options={itlgInvolvedAgencySelectOptions}
                  onInputChange={(e) => FilterItlgInvolvedAgencySelectOptions(e)}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-4 col-md-4">
              <div
                className="btn btn-primary"
                style={{ marginTop: '32px' }}
                onClick={() => updateFormData({ itlgInvolvedAgencyCode: '' })}
              >
                非屬以上機關
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6">
              <FormGroup>
                <Label htmlFor="mainSuspectName" className="text-primary">
                  主對象姓名(或公司名稱)
                </Label>
                <div className="input-group">
                  <Input
                    type="text"
                    id="mainSuspectName"
                    name="mainSuspectName"
                    onChange={(e) => updateFormData({ mainSuspectName: e.target.value })}
                    value={formData.mainSuspectName}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    disabled={isLoading}
                    className="btn btn-primary"
                    style={{ zIndex: 0 }}
                    onClick={() => openSuspectNameCollisionModal(formData.mainSuspectName)}
                  >
                    關鍵字查詢
                  </button>
                </div>
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-6">
              <FormGroup>
                <Label htmlFor="mainSuspectRole">主對象身分</Label>
                <div className="input-group">
                  <button disabled={isLoading} className="btn btn-primary" style={{ zIndex: 0 }}>
                    基資比對
                  </button>
                  <Select
                    id="mainSuspectRole"
                    name="mainSuspectRole"
                    onChange={(e) => updateFormData({ mainSuspectRole: e.target.value })}
                    value={formData.mainSuspectRole}
                    disabled={isLoading}
                    options={mainSuspectRoleSelectOptions}
                  />
                </div>
              </FormGroup>
            </div>
          </div>
          <Card>
            <Card.Header style={{ backgroundColor: '#d3d3d3' }}>分案設定</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="caseCategory" className="text-primary">
                      分案類別
                    </Label>
                    <Select
                      id="caseCategory"
                      name="caseCategory"
                      onChange={(e) => updateFormData({ caseCategory: e.target.value })}
                      value={formData.caseCategory}
                      disabled={isLoading}
                      options={caseCategorySelectOptions}
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="mainSuspectId" className="text-primary">
                      對象清單(擇一主對象)
                    </Label>
                    <Select
                      id="mainSuspectId"
                      name="mainSuspectId"
                      onChange={(e) =>
                        updateFormData({
                          mainSuspectId: e.target.value,
                          mainSuspectName:
                            e.target.selectedOptions[0].textContent == null
                              ? ''
                              : e.target.selectedOptions[0].textContent,
                        })
                      }
                      value={formData.mainSuspectId}
                      disabled={isLoading}
                      options={objectPersonSelectOptions}
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="objectCategory" className="text-primary">
                      對象類別
                    </Label>
                    <Select
                      id="objectCategory"
                      name="objectCategory"
                      onChange={(e) => updateFormData({ objectCategory: e.target.value })}
                      value={formData.objectCategory}
                      disabled={isLoading}
                      options={objectCategorySelectOptions}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="supervisorDepartment" className="text-primary">
                      承辦人單位
                    </Label>
                    <Select
                      id="supervisorDepartment"
                      name="supervisorDepartment"
                      onChange={(e) => updateFormData({ supervisorDepartment: e.target.value })}
                      value={formData.supervisorDepartment}
                      disabled={isLoading}
                      options={supervisorDepartmentSelectOptions}
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="itlgSrcSupervisor" className="text-primary">
                      承辦人姓名(五碼)
                    </Label>
                    <Select
                      id="itlgSrcSupervisor"
                      name="itlgSrcSupervisor"
                      onChange={(e) =>
                        updateFormData({
                          itlgSrcSupervisorName:
                            e.target.selectedOptions[0].textContent == null
                              ? ''
                              : e.target.selectedOptions[0].textContent,
                          itlgSrcSupervisorId: e.target.value,
                        })
                      }
                      value={formData.itlgSrcSupervisorId}
                      disabled={isLoading}
                      options={supervisorSelectOptions}
                    />
                  </FormGroup>
                </div>
              </div>
            </Card.Body>
          </Card>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6"></div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12">
              <FormGroup>
                <Label htmlFor="itlgSrcCaseName" className="text-primary">
                  主旨(洗防處案名)
                </Label>
                <div className="input-group">
                  <Input
                    type="text"
                    id="itlgSrcCaseName"
                    name="itlgSrcCaseName"
                    onChange={(e) => updateFormData({ itlgSrcCaseName: e.target.value })}
                    value={formData.itlgSrcCaseName}
                    disabled={isLoading}
                  />
                  <button disabled={isLoading} className="btn btn-primary">
                    下載外勤用.docx
                  </button>
                </div>
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-8 col-md-8">
              <FormGroup>
                <Label htmlFor="itlgSrcCaseAbstract" className="text-primary">
                  情資內容(案情摘要)
                </Label>
                <textarea
                  id="itlgSrcCaseAbstract"
                  name="itlgSrcCaseAbstract"
                  onChange={(e) => updateFormData({ itlgSrcCaseAbstract: e.target.value })}
                  value={formData.itlgSrcCaseAbstract}
                  disabled={isLoading}
                  className="form-control"
                  style={{ height: '200px' }}
                ></textarea>
              </FormGroup>
            </div>
            <div className="col-12 col-sm-4 col-md-4">
              <Card style={{ marginTop: '32px', height: '200px' }}>
                <Card.Header style={{ backgroundColor: '#d3d3d3' }}>附加檔案</Card.Header>
                <Card.Body style={{ overflow: 'hidden', overflowY: 'auto' }}>
                  <div className="col-12 col-sm-12 col-md-12">
                    <ul className="list-group list-group-flush">
                      {downloadFileLists.length > 0 ? (
                        downloadFileLists.map((x) => (
                          <li
                            key={x.intelligenceFileId}
                            className="list-group-item"
                            onClick={() => DownloadFile(x.intelligenceFileId ? x.intelligenceFileId : '')}
                          >
                            {x.originFileName}
                          </li>
                        ))
                      ) : (
                        <li className="list-group-item" style={{ color: '#c7c7c7', textDecoration: 'none' }}>
                          無附加檔案
                        </li>
                      )}
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6">
              <FormGroup>
                <Label htmlFor="itlgSrcCreateFileDate" className="text-primary">
                  分送日期(建檔日期)
                </Label>
                <DatePicker
                  id="itlgSrcCreateFileDate"
                  name="itlgSrcCreateFileDate"
                  format="yyyy/MM/dd"
                  placeholder="年/月/日"
                  onChange={(e) => updateFormData({ itlgSrcCreateFileDate: e })}
                  value={formData.itlgSrcCreateFileDate}
                  disabled={isLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-6">
              <FormGroup>
                <Label htmlFor="itlgSrcNumber" className="text-primary">
                  來源字號
                </Label>
                <Input
                  type="text"
                  id="itlgSrcNumber"
                  name="itlgSrcNumber"
                  onChange={(e) =>
                    updateFormData({
                      itlgSrcNumber: e.target.value,
                    })
                  }
                  value={formData.itlgSrcNumber}
                  disabled={isLoading}
                />
              </FormGroup>
            </div>
          </div>
          <UploadFileTableCard />
          <ObjPersonTableCard />
          <div className="row">
            <div className="col-12 text-center">
              <button type="submit" disabled={isLoading} className="btn btn-primary btn-width-lg">
                儲存
              </button>
              <button
                disabled={isLoading}
                className="btn btn-primary btn-width-lg"
                style={{ marginLeft: '5px' }}
              >
                寫入公文
              </button>
              <button
                disabled={isLoading}
                className="btn btn-primary btn-width-lg"
                style={{ marginLeft: '5px' }}
              >
                下載word檔案(.docx)
              </button>
            </div>
          </div>
        </form>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};
