import { FormGroup, Label, Input, Select, useForm } from '@src/components/form';
import { useEffect, useState } from 'react';
import { Card } from '@src/components/card';
import { usePageActionContext, usePageStateContext } from '../context';
import { CaseDistributeModel, SelectOptionList } from '../types';

export const CaseDistributeCard = () => {
  const { selectedData } = usePageStateContext();
  const { selectOption } = usePageStateContext();
  const { isLoading } = usePageStateContext();
  const { handleCaseDistributeFormSubmit } = usePageActionContext();
  const DEFAULT_OPTION = [{ text: '請選擇', value: '' }];
  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<CaseDistributeModel>({
    caseDistributeUnit: { initialValue: '', validate: () => ({}) },
    caseCategory: { initialValue: '', validate: () => ({}) },
    objectCategory: { initialValue: '', validate: () => ({}) },
    supervisorDepartment: { initialValue: '', validate: () => ({}) },
    supervisorId: { initialValue: '', validate: () => ({}) },
    objPersonId: { initialValue: '', validate: () => ({}) },
    mainSuspectId: { initialValue: '', validate: () => ({}) },
    mainSuspectName: { initialValue: '', validate: () => ({}) },
  });

  useEffect(() => {
    if (selectedData) {
      updateFormData({
        caseDistributeUnit: '',
        caseCategory: '',
        objectCategory: '',
        supervisorDepartment: '',
        supervisorId: '',
        objPersonId: '',
        mainSuspectId: '',
        mainSuspectName: '',
      });
    } else {
      updateFormData({
        caseDistributeUnit: '',
        caseCategory: '',
        objectCategory: '',
        supervisorDepartment: '',
        supervisorId: '',
        objPersonId: '',
        mainSuspectId: '',
        mainSuspectName: '',
      });
    }
  }, [selectedData]);

  return (
    <form
      className="container-fluid"
      onSubmit={(e) => {
        e.preventDefault();
        if (selectedData)
          handleCaseDistributeFormSubmit({ ExternalIntelligence: selectedData, CaseDistribute: formData });
      }}
    >
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">分案設定</div>
        <div className="container" style={{ paddingTop: 15, paddingBottom: 15 }}>
          <div className="row">
            <div className="col-4">
              <FormGroup>
                <Label>分案類別</Label>
                <Select
                  id="intelligenceType"
                  name="intelligenceType"
                  value={formData.caseCategory}
                  onChange={(e) => {
                    updateFormData({ caseCategory: e.target.value });
                  }}
                  options={DEFAULT_OPTION.concat(selectOption?.caseCategory || [])}
                />
              </FormGroup>
            </div>
            <div className="col-4">
              <FormGroup>
                <Label>對象清單(擇一主對象)</Label>
                <Select
                  id="suspects"
                  name="suspects"
                  value={formData.mainSuspectId}
                  onChange={(e) => updateFormData({ mainSuspectId: e.target.value })}
                  options={DEFAULT_OPTION.concat(selectOption?.suspects || [])}
                />
              </FormGroup>
            </div>
            <div className="col-4">
              <FormGroup>
                <Label>對象類別</Label>
                <Select
                  id="objectCategory"
                  name="objectCategory"
                  value={formData.objectCategory}
                  onChange={(e) => updateFormData({ objectCategory: e.target.value })}
                  options={
                    formData.caseCategory == '02'
                      ? DEFAULT_OPTION.concat(selectOption?.objType || [])
                      : DEFAULT_OPTION.concat(selectOption?.notObjType || [])
                  }
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <FormGroup>
                <Label>承辦人單位</Label>
                <Select
                  id="supervisorDepartment"
                  name="supervisorDepartment"
                  value={formData.supervisorDepartment}
                  onChange={(e) => updateFormData({ supervisorDepartment: e.target.value })}
                  options={DEFAULT_OPTION.concat(selectOption?.supervisorDepartment || [])}
                />
              </FormGroup>
            </div>
            <div className="col-4">
              <FormGroup>
                <Label>承辦人姓名(五碼)</Label>
                <Select
                  id="supervisorId"
                  name="supervisorId"
                  value={formData.supervisorId}
                  onChange={(e) => updateFormData({ supervisorId: e.target.value })}
                  options={DEFAULT_OPTION}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="wrap h-100 d-flex align-items-center justify-content-end">
                <button type="submit" className="btn btn-primary btn-width-lg me-2">
                  分案
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
