import { FormGroup, Label, Input, useForm } from '@src/components/form';
import { useEffect } from 'react';
import { Card } from '@src/components/card';
import { usePageActionContext, usePageStateContext } from '../context';
import { CardForm } from '../types';
import { FileList } from './FileList';
import { CaseDistributeCard } from './CaseDistributeCard';

export const CaseInfoCard = () => {
  const { selectedData } = usePageStateContext();
  const { isLoading } = usePageStateContext();

  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<CardForm>({
    seq: { initialValue: '', validate: () => ({}) },
    intelligenceNo: { initialValue: '', validate: () => ({}) },
    supervisor: { initialValue: '', validate: () => ({}) },
    supervisorName: { initialValue: '', validate: () => ({}) },
    fileNo: { initialValue: '', validate: () => ({}) },
    caseNo: { initialValue: '', validate: () => ({}) },
    caseName: { initialValue: '', validate: () => ({}) },
    createFileDate: { initialValue: '', validate: () => ({}) },
    caseAbstract: { initialValue: '', validate: () => ({}) },
    reportUnitCode: { initialValue: '', validate: () => ({}) },
    transReportPersonId: { initialValue: '', validate: () => ({}) },
    reportNumber: { initialValue: '', validate: () => ({}) },
    srcNumber: { initialValue: '', validate: () => ({}) },
    createTime: { initialValue: '', validate: () => ({}) },
  });

  useEffect(() => {
    if (selectedData) {
      updateFormData({
        seq: selectedData.seq,
        intelligenceNo: selectedData.intelligenceNo,
        supervisor: selectedData.supervisor,
        supervisorName: selectedData.supervisorName,
        fileNo: selectedData.fileNo,
        caseNo: selectedData.caseNo,
        caseName: selectedData.caseName,
        createFileDate: selectedData.createFileDate,
        caseAbstract: selectedData.caseAbstract,
        reportUnitCode: selectedData.reportUnitCode,
        transReportPersonId: selectedData.transReportPersonId,
        reportNumber: selectedData.reportNumber,
        srcNumber: selectedData.srcNumber,
        createTime: selectedData.createTime,
      });
    } else {
      updateFormData({
        seq: '',
        intelligenceNo: '',
        supervisor: '',
        supervisorName: '',
        fileNo: '',
        caseNo: '',
        caseName: '',
        createFileDate: '',
        caseAbstract: '',
        reportUnitCode: '',
        transReportPersonId: '',
        reportNumber: '',
        srcNumber: '',
        createTime: '',
      });
    }
  }, [selectedData]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="createTime">系統建立日期</Label>
              <Input
                readOnly
                type="text"
                id="createTime"
                name="createTime"
                //onChange={(e) => updateFormData({ createTime: e.target.value })}
                defaultValue={formData.createTime}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="intelligenceNo">保防處情資編號</Label>
              <Input
                readOnly
                type="text"
                id="intelligenceNo"
                name="intelligenceNo"
                //onChange={(e) => updateFormData({ intelligenceNo: e.target.value })}
                defaultValue={formData.intelligenceNo}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="supervisor">保防處承辦人</Label>
              <Input
                readOnly
                type="text"
                id="supervisor"
                name="supervisor"
                //onChange={(e) => updateFormData({ supervisor: e.target.value })}
                defaultValue={formData.supervisor}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="fileNo">國情文號</Label>
              <Label className="hint-display">(原保防處檔號)</Label>
              <Input
                readOnly
                type="text"
                id="fileNo"
                name="fileNo"
                //onChange={(e) => updateFormData({ fileNo: e.target.value })}
                defaultValue={formData.fileNo}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="caseNo">保防處案號</Label>
              <Input
                readOnly
                type="text"
                id="caseNo"
                name="caseNo"
                //onChange={(e) => updateFormData({ caseNo: e.target.value })}
                defaultValue={formData.caseNo}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="caseName">保防處案名</Label>
              <Input
                readOnly
                type="text"
                id="caseName"
                name="caseName"
                //onChange={(e) => updateFormData({ caseName: e.target.value })}
                defaultValue={formData.caseName}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="createFileDate">建檔日期</Label>
              <Input
                readOnly
                type="text"
                id="createFileDate"
                name="createFileDate"
                //onChange={(e) => updateFormData({ createFileDate: e.target.value })}
                defaultValue={formData.createFileDate}
              />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-8">
            <FormGroup>
              <Label htmlFor="caseAbstract">案情摘要</Label>
              <textarea
                readOnly
                style={{ height: '500px' }}
                className="form-control"
                id="caseAbstract"
                name="caseAbstract"
                //onChange={(e) => updateFormData({ caseAbstract: e.target.value })}
                defaultValue={formData.caseAbstract}
              />
            </FormGroup>
          </div>
          <FileList />
        </div>
      </div>
    </>
  );
};
