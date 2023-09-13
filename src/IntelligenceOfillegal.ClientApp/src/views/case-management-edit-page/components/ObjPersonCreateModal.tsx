import { useEffect } from 'react';
import { FormGroup, Label, Input, useForm, Checkbox, DatePicker } from '@src/components/form';
import { Modal } from '@src/components/modal';
import { usePageActionContext, usePageStateContext } from '../context';
import { ObjPerson } from '../types';

export const ObjPersonCreateModal = () => {
  const { isShowObjPersonCreateModal } = usePageStateContext();
  const { closeObjPersonCreateModal, createObjPersonCreateModal } = usePageActionContext();
  const { formData, updateFormData } = useForm<ObjPerson>({
    seq: { initialValue: 0, validate: () => ({}) },
    isMainSuspect: { initialValue: false, validate: () => ({}) },
    personTitle: { initialValue: '', validate: () => ({}) },
    personName: { initialValue: '', validate: () => ({}) },
    personID: { initialValue: '', validate: () => ({}) },
    isReportLink: { initialValue: false, validate: () => ({}) },
    createPersonId: { initialValue: '', validate: () => ({}) },
    createTime: { initialValue: '', validate: () => ({}) },
    objPersonId: { initialValue: null, validate: () => ({}) },
  });

  return (
    <Modal show={isShowObjPersonCreateModal} size="lg">
      <Modal.Header>
        <Modal.Title>新增對象清單</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="isMainSuspect">是否為主要對象</Label>
                <Checkbox
                  id="isMainSuspect"
                  name="isMainSuspect"
                  checked={formData.isMainSuspect}
                  onChange={(e) => updateFormData({ isMainSuspect: e.target.checked })}
                  className="form-switch"
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="personName">對象姓名</Label>
                <Input
                  type="text"
                  id="personName"
                  name="personName"
                  value={formData.personName}
                  onChange={(e) => updateFormData({ personName: e.target.value })}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="personID">對象身分證號</Label>
                <Input
                  type="text"
                  id="personID"
                  name="personID"
                  value={formData.personID}
                  onChange={(e) => updateFormData({ personID: e.target.value })}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="isReportLink">提列洗錢勾稽</Label>
                <Checkbox
                  id="isReportLink"
                  name="isReportLink"
                  checked={formData.isReportLink}
                  onChange={(e) => updateFormData({ isReportLink: e.target.checked })}
                  className="form-switch"
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="createTime">勾稽異動日</Label>
                <DatePicker
                  id="createTime"
                  name="createTime"
                  value={formData.createTime}
                  placeholder="年/月/日"
                  format="yyyy/MM/dd"
                  onChange={(e) => updateFormData({ createTime: e })}
                />
              </FormGroup>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            closeObjPersonCreateModal();
          }}
        >
          取消
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => createObjPersonCreateModal(formData)}
        >
          新增
        </button>
      </Modal.Footer>
    </Modal>
  );
};
