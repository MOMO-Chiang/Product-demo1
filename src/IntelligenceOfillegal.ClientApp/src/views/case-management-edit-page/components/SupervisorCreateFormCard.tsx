import { FormGroup, Label, Input, useForm, DatePicker, Select } from '@src/components/form';
import { usePageActionContext, usePageStateContext } from '../context';
import { Card } from '@src/components/card';
import { useEffect } from 'react';
import { SupervisorUploadFileTableCard } from './SupervisorUploadFileTableCard';
import { SupervisorModel } from '../types';

export const SupervisorCreateFormCard = () => {
  const {
    isLoading,
    supervisorModel,
    investigateProgressSelectOptions,
    subCaseTypeSelectOptions,
    mainCaseTypeSelectOptions,
  } = usePageStateContext();
  const { handleSupervisorFormSubmit, openCaseManagementTransferModal } = usePageActionContext();

  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<SupervisorModel>({
    intelligenceNo: { initialValue: '', validate: () => ({}) },
    investigateProgressCode: { initialValue: '', validate: () => ({}) },
    assignInvestigateDate: { initialValue: '', validate: () => ({}) },
    reCheckDate: { initialValue: '', validate: () => ({}) },
    mainCaseIntelligenceNumber: { initialValue: '', validate: () => ({}) },
    remark: { initialValue: '', validate: () => ({}) },
    caseAdminNumber: { initialValue: '', validate: () => ({}) },
    mainCaseType: { initialValue: '', validate: () => ({}) },
    subCaseType: { initialValue: '', validate: () => ({}) },
  });

  useEffect(() => {
    updateFormData(supervisorModel as Partial<SupervisorModel>);
  }, [supervisorModel]);

  return (
    <Card style={{ backgroundColor: 'rgb(213, 232, 212)' }}>
      <form
        className="container-fluid"
        onSubmit={(e) => {
          e.preventDefault();
          handleSupervisorFormSubmit(formData);
        }}
      >
        <Card.Header>
          <div>
            <label
              className="btn btn-primary"
              style={{ marginRight: '5px' }}
              onClick={openCaseManagementTransferModal}
            >
              情資移轉
            </label>
            <button className="btn btn-primary" type="submit" disabled={isLoading}>
              儲存
            </button>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="investigateProgressCode">調查進度</Label>
                <Select
                  id="investigateProgressCode"
                  name="investigateProgressCode"
                  onChange={(e) => updateFormData({ investigateProgressCode: e.target.value })}
                  value={formData.investigateProgressCode}
                  disabled={isLoading}
                  options={investigateProgressSelectOptions}
                />
              </FormGroup>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="assignInvestigateDate">發查日期(發給外勤)</Label>
                <DatePicker
                  id="assignInvestigateDate"
                  name="assignInvestigateDate"
                  format="yyyy/MM/dd"
                  placeholder="年/月/日"
                  onChange={(e) => updateFormData({ assignInvestigateDate: e })}
                  value={formData.assignInvestigateDate}
                  disabled={isLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="reCheckDate">查覆日期</Label>
                <DatePicker
                  id="reCheckDate"
                  name="reCheckDate"
                  format="yyyy/MM/dd"
                  placeholder="年/月/日"
                  onChange={(e) => updateFormData({ reCheckDate: e })}
                  value={formData.reCheckDate}
                  disabled={isLoading}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="mainCaseIntelligenceNumber">主案之情資編號</Label>
                <Input
                  type="text"
                  id="mainCaseIntelligenceNumber"
                  name="mainCaseIntelligenceNumber"
                  onChange={(e) => updateFormData({ mainCaseIntelligenceNumber: e.target.value })}
                  value={formData.mainCaseIntelligenceNumber}
                  disabled={isLoading}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="mainCaseType">案件主類別</Label>
                <Select
                  id="mainCaseType"
                  name="mainCaseType"
                  onChange={(e) =>
                    updateFormData({
                      mainCaseType: e.target.value,
                    })
                  }
                  value={formData.mainCaseType}
                  disabled={isLoading}
                  options={mainCaseTypeSelectOptions}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="subCaseType">案件次類別</Label>
                <Select
                  id="subCaseType"
                  name="subCaseType"
                  onChange={(e) =>
                    updateFormData({
                      subCaseType: e.target.value,
                    })
                  }
                  value={formData.subCaseType}
                  disabled={isLoading}
                  options={subCaseTypeSelectOptions}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12">
              <FormGroup>
                <Label htmlFor="remark">備註(情資研析)</Label>
                <textarea
                  id="remark"
                  name="remark"
                  onChange={(e) => updateFormData({ remark: e.target.value })}
                  value={formData.remark}
                  disabled={isLoading}
                  className="form-control"
                  style={{ height: '200px' }}
                ></textarea>
              </FormGroup>
            </div>
          </div>
          <Card>
            <Card.Header style={{ backgroundColor: '#d3d3d3' }}>案件管制系統</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="caseAdminNumber">案管案號</Label>
                    <Input
                      type="text"
                      id="caseAdminNumber"
                      name="caseAdminNumber"
                      onChange={(e) => updateFormData({ caseAdminNumber: e.target.value })}
                      value={formData.caseAdminNumber}
                      disabled={isLoading}
                    />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="">案件承辦科</Label>
                    <Input type="text" id="" name="" disabled={true} />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="">案件承辦人</Label>
                    <Input type="text" id="" name="" disabled={true} />
                  </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="">案件狀況</Label>
                    <Input type="text" id="" name="" value="" disabled={true} />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="">立案日期</Label>
                    <Input type="text" id="" name="" value="" disabled={true} />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="">主辦單位</Label>
                    <Input type="text" id="" name="" value="" disabled={true} />
                  </FormGroup>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="">外勤承辦人五碼</Label>
                    <Input type="text" id="" name="" value="" disabled={true} />
                  </FormGroup>
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <FormGroup>
                    <Label htmlFor="">原報代號</Label>
                    <Input type="text" id="" name="" value="" disabled={true} />
                  </FormGroup>
                </div>
              </div>
            </Card.Body>
          </Card>
          <SupervisorUploadFileTableCard />
        </Card.Body>
      </form>
      <Card.Footer></Card.Footer>
    </Card>
  );
};
