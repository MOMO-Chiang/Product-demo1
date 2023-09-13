import { useEffect } from 'react';
import { FormGroup, Label, Input, useForm } from '@src/components/form';
import { Modal } from '@src/components/modal';
import { usePageActionContext, usePageStateContext } from '../context';
import { SystemUnitRespPersonModel } from '../types';

export const SystemUnitRespPersonDeleteModal = () => {
  const { isShowSystemUnitRespPersonDeleteModal, selectedSystemUnitRespPerson } = usePageStateContext();
  const { closeSystemUnitRespPersonDeleteModal, handleSystemUnitRespPersonDeleteFormSubmit } =
    usePageActionContext();
  const { formData, updateFormData } = useForm<SystemUnitRespPersonModel>({
    seq: { initialValue: '', validate: () => ({}) },
    systemPlatformUnitName: { initialValue: '', validate: () => ({}) },
    unitCode: { initialValue: '', validate: () => ({}) },
    unitName: { initialValue: '', validate: () => ({}) },
    responsiblePerson1: { initialValue: '', validate: () => ({}) },
    responsiblePerson2: { initialValue: '', validate: () => ({}) },
    responsiblePerson3: { initialValue: '', validate: () => ({}) },
    updateUserId: { initialValue: '', validate: () => ({}) },
    updateUserName: { initialValue: '', validate: () => ({}) },
    updateTime: { initialValue: '', validate: () => ({}) },
  });

  useEffect(() => {
    if (selectedSystemUnitRespPerson) {
      updateFormData({
        systemPlatformUnitName: selectedSystemUnitRespPerson.systemPlatformUnitName,
        unitCode: selectedSystemUnitRespPerson.unitCode,
        unitName: selectedSystemUnitRespPerson.unitName,
        responsiblePerson1: selectedSystemUnitRespPerson.responsiblePerson1,
        updateUserId: selectedSystemUnitRespPerson.updateUserId,
      });
    } else {
      updateFormData({
        systemPlatformUnitName: '',
        unitCode: '',
        unitName: '',
        responsiblePerson1: '',
        updateUserId: '',
      });
    }
  }, [selectedSystemUnitRespPerson]);

  return (
    <Modal show={isShowSystemUnitRespPersonDeleteModal} size="lg">
      <Modal.Header>
        <Modal.Title>人員刪除</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <FormGroup>
                <Label htmlFor="idCardNum" className="text-primary">
                  身分證字號
                </Label>
                <Input
                  type="text"
                  id="idCardNum"
                  name="idCardNum"
                  value={formData.systemPlatformUnitName}
                  disabled
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <FormGroup>
                <Label htmlFor="fullName" className="text-primary">
                  姓名
                </Label>
                <Input type="text" id="fullName" name="fullName" value={formData.unitCode} disabled />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <FormGroup>
                <Label htmlFor="gender" className="text-primary">
                  性別
                </Label>
                <Input type="text" id="gender" name="gender" value={formData.unitName} disabled />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <FormGroup>
                <Label htmlFor="phoneNumber" className="text-primary">
                  電話號碼
                </Label>
                <Input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.responsiblePerson1}
                  disabled
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <FormGroup>
                <Label htmlFor="email" className="text-primary">
                  電子信箱
                </Label>
                <Input type="number" id="email" name="email" value={formData.updateUserId} disabled />
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
            closeSystemUnitRespPersonDeleteModal();
          }}
        >
          取消
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleSystemUnitRespPersonDeleteFormSubmit(formData)}
        >
          刪除
        </button>
      </Modal.Footer>
    </Modal>
  );
};
