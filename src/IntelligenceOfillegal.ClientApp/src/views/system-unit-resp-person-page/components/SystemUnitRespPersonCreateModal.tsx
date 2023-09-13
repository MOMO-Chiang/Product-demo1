import { useEffect } from 'react';
import { FormGroup, Label, Input, useForm } from '@src/components/form';
import { Modal } from '@src/components/modal';
import { usePageActionContext, usePageStateContext } from '../context';
import { SystemUnitRespPersonCreateModel } from '../types';

export const SystemUnitRespPersonCreateModal = () => {
  const { isShowSystemUnitRespPersonCreateModal, selectedSystemUnitRespPerson } = usePageStateContext();
  const { closeSystemUnitRespPersonCreateModal, handleSystemUnitRespPersonCreateFormSubmit } =
    usePageActionContext();
  const { formData, updateFormData } = useForm<SystemUnitRespPersonCreateModel>({
    idCardNum: { initialValue: '', validate: () => ({}) },
    fullName: { initialValue: '', validate: () => ({}) },
    gender: { initialValue: '', validate: () => ({}) },
    phoneNumber: { initialValue: '', validate: () => ({}) },
    email: { initialValue: '', validate: () => ({}) },
  });

  useEffect(() => {
    if (selectedSystemUnitRespPerson) {
      updateFormData({
        idCardNum: selectedSystemUnitRespPerson.systemPlatformUnitName,
        fullName: selectedSystemUnitRespPerson.unitCode,
        gender: selectedSystemUnitRespPerson.unitName,
        phoneNumber: selectedSystemUnitRespPerson.responsiblePerson1,
        email: selectedSystemUnitRespPerson.updateUserId,
      });
    } else {
      updateFormData({
        idCardNum: '',
        fullName: '',
        gender: '',
        phoneNumber: '',
        email: '',
      });
    }
  }, [selectedSystemUnitRespPerson]);

  return (
    <Modal show={isShowSystemUnitRespPersonCreateModal} size="lg">
      <Modal.Header>
        <Modal.Title>人員新增</Modal.Title>
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
                  onChange={(e) => updateFormData({ idCardNum: e.target.value })}
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
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  onChange={(e) => updateFormData({ fullName: e.target.value })}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <FormGroup>
                <Label htmlFor="gender" className="text-primary">
                  性別
                </Label>
                <Input
                  type="text"
                  id="gender"
                  name="gender"
                  onChange={(e) => updateFormData({ gender: e.target.value })}
                />
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
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
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
                <Input
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => updateFormData({ email: e.target.value })}
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
            closeSystemUnitRespPersonCreateModal();
          }}
        >
          取消
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleSystemUnitRespPersonCreateFormSubmit(formData)}
        >
          新增
        </button>
      </Modal.Footer>
    </Modal>
  );
};
