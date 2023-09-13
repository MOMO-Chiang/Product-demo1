import { useEffect } from 'react';
import { FormGroup, Label, Input, useForm, Select } from '@src/components/form';
import { Modal } from '@src/components/modal';
import { usePageActionContext, usePageStateContext } from '../context';
import { BasicCodeEditModel } from '../types';

export const BasicCodeEditModal = () => {
  const { isShowBasicCodeEditModal, selectedBasicCode } = usePageStateContext();
  const { closeBasicCodeEditModal, handleBasicCodeEditFormSubmit } = usePageActionContext();
  const { formData, updateFormData } = useForm<BasicCodeEditModel>({
    seq: { initialValue: '', validate: () => ({}) },
    categoryCode: { initialValue: '', validate: () => ({}) },
    category: { initialValue: '', validate: () => ({}) },
    value: { initialValue: '', validate: () => ({}) },
    text: { initialValue: '', validate: () => ({}) },
    isActived: { initialValue: true, validate: () => ({}) },
    updatePersonId: { initialValue: '', validate: () => ({}) },
    updateTime: { initialValue: '', validate: () => ({}) },
    createPersonId: { initialValue: '', validate: () => ({}) },
    createIP: { initialValue: '', validate: () => ({}) },
    createTime: { initialValue: '', validate: () => ({}) },
  });

  useEffect(() => {
    if (selectedBasicCode) {
      updateFormData({
        seq: selectedBasicCode.seq,
        categoryCode: selectedBasicCode.categoryCode,
        category: selectedBasicCode.category,
        value: selectedBasicCode.value,
        text: selectedBasicCode.text,
        isActived: selectedBasicCode.isActived,
        updatePersonId: selectedBasicCode.updatePersonId,
        updateTime: selectedBasicCode.updateTime,
        createPersonId: selectedBasicCode.createPersonId,
        createIP: selectedBasicCode.createIP,
        createTime: selectedBasicCode.createTime,
      });
    } else {
      updateFormData({
        seq: '',
        categoryCode: '',
        category: '',
        value: '',
        text: '',
        isActived: false,
        updatePersonId: '',
        updateTime: '',
        createPersonId: '',
        createIP: '',
        createTime: '',
      });
    }
  }, [selectedBasicCode]);

  return (
    <Modal show={isShowBasicCodeEditModal} size="lg">
      <Modal.Header className="d-block">
        <div className="d-flex">
          <Modal.Title>修改基礎代碼維護資料</Modal.Title>
          <Modal.CloseButton onClick={closeBasicCodeEditModal}></Modal.CloseButton>
        </div>
      </Modal.Header>
      {/** <form onSubmit={handleSubmit}> */}
      <form>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="seq">流水號</Label>
                <Input
                  type="text"
                  id="seq"
                  name="seq"
                  onChange={(e) => updateFormData({ seq: e.target.value })}
                  value={formData.seq}
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="category">類別名稱</Label>
                <Input
                  type="text"
                  id="category"
                  name="category"
                  onChange={(e) => updateFormData({ category: e.target.value })}
                  value={formData.category}
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="categoryCode">類別代碼</Label>
                <Input
                  type="text"
                  id="categoryCode"
                  name="categoryCode"
                  onChange={(e) => updateFormData({ categoryCode: e.target.value })}
                  value={formData.categoryCode}
                  disabled
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="text">顯示名稱</Label>
                <Input
                  type="text"
                  id="text"
                  name="text"
                  onChange={(e) => updateFormData({ text: e.target.value })}
                  value={formData.text}
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
                <Label htmlFor="isActived">啟用</Label>
                <div className="form-check form-switch form-switch-lg">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="isActived"
                    name="isActived"
                    checked={formData.isActived}
                    onChange={(e) => updateFormData({ isActived: e.target.checked })}
                  />
                </div>
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="value">顯示名稱代碼</Label>
                <Input
                  type="text"
                  id="value"
                  name="value"
                  onChange={(e) => updateFormData({ value: e.target.value })}
                  value={formData.value}
                  disabled
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="updatePersonId">資料異動人員五碼</Label>
                <Input
                  type="text"
                  id="updatePersonId"
                  name="updatePersonId"
                  onChange={(e) => updateFormData({ updatePersonId: e.target.value })}
                  value={formData.updatePersonId}
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="updateTime">資料異動時間</Label>
                <Input
                  type="text"
                  id="updateTime"
                  name="updateTime"
                  onChange={(e) => updateFormData({ updateTime: e.target.value })}
                  value={formData.updateTime}
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="createPersonId">資料建立人員五碼</Label>
                <Input
                  type="text"
                  id="createPersonId"
                  name="createPersonId"
                  onChange={(e) => updateFormData({ createPersonId: e.target.value })}
                  value={formData.createPersonId}
                  disabled
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="createTime">資料建立時間</Label>
                <Input
                  type="text"
                  id="createTime"
                  name="createTime"
                  onChange={(e) => updateFormData({ createTime: e.target.value })}
                  value={formData.createTime}
                  disabled
                />
              </FormGroup>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-light btn-width-lg" 
                  onClick={() => {closeBasicCodeEditModal();}}>
            取消
          </button>
          <button type="submit" className="btn btn-primary btn-width-lg me-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBasicCodeEditFormSubmit(formData)
                  }}
                >
            更新
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
