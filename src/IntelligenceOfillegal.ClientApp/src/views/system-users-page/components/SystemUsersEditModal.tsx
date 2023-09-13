import { useEffect } from 'react';
import { FormGroup, Label, Input, useForm, Select } from '@src/components/form';
import { Modal } from '@src/components/modal';
import { usePageActionContext, usePageStateContext } from '../context';
import { SystemUsersEditModel, PERMISSION_OPTION } from '../types';

export const SystemUsersEditModal = () => {
  const { isShowSystemUsersEditModal, selectedSystemUsers } = usePageStateContext();
  const { closeSystemUsersEditModal, handleSystemUsersEditFormSubmit } = usePageActionContext();
  const { formData, updateFormData } = useForm<SystemUsersEditModel>({
    userId: { initialValue: '', validate: () => ({}) },
    userName: { initialValue: '', validate: () => ({}) },
    unitCode: { initialValue: '', validate: () => ({}) },
    unitName: { initialValue: '', validate: () => ({}) },
    isValid: { initialValue: true, validate: () => ({}) },
    permission: { initialValue: '', validate: () => ({}) },
    updateUserId: { initialValue: '', validate: () => ({}) },
    updateUserName: { initialValue: '', validate: () => ({}) },
    updateTime: { initialValue: '', validate: () => ({}) },
    createTime: { initialValue: '', validate: () => ({}) },
  });

  useEffect(() => {
    if (selectedSystemUsers) {
      updateFormData({
        userId: selectedSystemUsers.userId,
        userName: selectedSystemUsers.userName,
        unitCode: selectedSystemUsers.unitCode,
        unitName: selectedSystemUsers.unitName,
        isValid: selectedSystemUsers.isValid,
        permission: selectedSystemUsers.permission,
        updateUserId: selectedSystemUsers.updateUserId,
        updateUserName: selectedSystemUsers.updateUserName,
        updateTime: selectedSystemUsers.updateTime,
        createTime: selectedSystemUsers.createTime,
      });
    } else {
      updateFormData({
        userId: '',
        userName: '',
        unitCode: '',
        unitName: '',
        isValid: false,
        permission: '',
        updateUserId: '',
        updateUserName: '',
        updateTime: '',
        createTime: '',
      });
    }
  }, [selectedSystemUsers]);

  return (
    <Modal show={isShowSystemUsersEditModal} size="lg">
      <Modal.Header className="d-block">
        <div className="d-flex">
          <Modal.Title>修改使用者帳號管理資料</Modal.Title>
          <Modal.CloseButton onClick={closeSystemUsersEditModal}></Modal.CloseButton>
        </div>
      </Modal.Header>
      {/** <form onSubmit={handleSubmit}> */}
      <form>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="userId">使用者帳號</Label>
                <Input
                  type="text"
                  id="userId"
                  name="userId"
                  onChange={(e) => updateFormData({ userId: e.target.value })}
                  value={formData.userId}
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="userName">使用者名稱</Label>
                <Input
                  type="text"
                  id="userName"
                  name="userName"
                  onChange={(e) => updateFormData({ userName: e.target.value })}
                  value={formData.userName}
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="unitCode">單位代碼</Label>
                <Input
                  type="text"
                  id="unitCode"
                  name="unitCode"
                  onChange={(e) => updateFormData({ unitCode: e.target.value })}
                  value={formData.unitCode}
                  disabled
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="unitName">單位名稱</Label>
                <Input
                  type="text"
                  id="unitName"
                  name="unitName"
                  onChange={(e) => updateFormData({ unitName: e.target.value })}
                  value={formData.unitName}
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
                <Label htmlFor="isValid">有效</Label>
                <div className="form-check form-switch form-switch-lg">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="isValid"
                    name="isValid"
                    checked={formData.isValid}
                    onChange={(e) => updateFormData({ isValid: e.target.checked })}
                  />
                </div>
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="permission">身分別功能權限</Label>
                <Select
                  id="permission"
                  name="permission"
                  options={PERMISSION_OPTION}
                  value={formData.permission}
                  onChange={(e) => updateFormData({ permission: e.target.value })}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="createTime">建立時間</Label>
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
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="updateUserId">最後異動人員帳號</Label>
                <Input
                  type="text"
                  id="updateUserId"
                  name="updateUserId"
                  onChange={(e) => updateFormData({ updateUserId: e.target.value })}
                  value={formData.updateUserId}
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="updateUserName">最後異動人員名稱</Label>
                <Input
                  type="text"
                  id="updateUserName"
                  name="updateUserName"
                  onChange={(e) => updateFormData({ updateUserName: e.target.value })}
                  value={formData.updateUserName}
                  disabled
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4">
              <FormGroup>
                <Label htmlFor="updateTime">最後異動時間</Label>
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-light btn-width-lg" 
                  onClick={() => {closeSystemUsersEditModal();}}>
            取消
          </button>
          <button type="submit" className="btn btn-primary btn-width-lg me-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSystemUsersEditFormSubmit(formData)
                  }}
                >
            更新
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
