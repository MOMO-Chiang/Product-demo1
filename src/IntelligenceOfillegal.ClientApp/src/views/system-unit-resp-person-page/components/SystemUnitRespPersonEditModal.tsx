import { useEffect } from 'react';
import { FormGroup, Label, Input, useForm, Select } from '@src/components/form';
import { Modal } from '@src/components/modal';
import { usePageActionContext, usePageStateContext } from '../context';
import { SystemUnitRespPersonEditModel } from '../types';

export const SystemUnitRespPersonEditModal = () => {
  const {
    isShowSystemUnitRespPersonEditModal,
    selectedSystemUnitRespPerson,
    responsiblePersonOptions,
    isLoading,
  } = usePageStateContext();
  const { closeSystemUnitRespPersonEditModal, handleSystemUnitRespPersonEditFormSubmit } =
    usePageActionContext();
  const { formData, updateFormData } = useForm<SystemUnitRespPersonEditModel>({
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
        seq: selectedSystemUnitRespPerson.seq,
        systemPlatformUnitName: selectedSystemUnitRespPerson.systemPlatformUnitName,
        unitCode: selectedSystemUnitRespPerson.unitCode,
        unitName: selectedSystemUnitRespPerson.unitName,
        responsiblePerson1: selectedSystemUnitRespPerson.responsiblePerson1 ?? '',
        responsiblePerson2: selectedSystemUnitRespPerson.responsiblePerson2 ?? '',
        responsiblePerson3: selectedSystemUnitRespPerson.responsiblePerson3 ?? '',
        updateUserId: selectedSystemUnitRespPerson.updateUserId ?? '',
        updateUserName: selectedSystemUnitRespPerson.updateUserName ?? '',
        updateTime: selectedSystemUnitRespPerson.updateTime ?? '',
      });
    } else {
      updateFormData({
        seq: '',
        systemPlatformUnitName: '',
        unitCode: '',
        unitName: '',
        responsiblePerson1: '',
        responsiblePerson2: '',
        responsiblePerson3: '',
        updateUserId: '',
        updateUserName: '',
        updateTime: '',
      });
    }
  }, [selectedSystemUnitRespPerson]);

  const getDistinctOptions = () => {
    const { responsiblePerson1, responsiblePerson2, responsiblePerson3 } = formData;
    return {
      responsiblePerson1: responsiblePersonOptions.filter(
        (r) => ![responsiblePerson2, responsiblePerson3].filter((e) => e).includes(r.value),
      ),
      responsiblePerson2: responsiblePersonOptions.filter(
        (r) => ![responsiblePerson1, responsiblePerson3].filter((e) => e).includes(r.value),
      ),
      responsiblePerson3: responsiblePersonOptions.filter(
        (r) => ![responsiblePerson1, responsiblePerson2].filter((e) => e).includes(r.value),
      ),
    };
  };

  return (
    <Modal show={isShowSystemUnitRespPersonEditModal} size="lg">
      <Modal.Header>
        <Modal.Title>修改設定-單位承辦人資料</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <FormGroup>
                <Label htmlFor="systemPlatformUnitName" className="text-primary">
                  系統管理員單位
                </Label>
                <Input
                  type="text"
                  id="systemPlatformUnitName"
                  name="systemPlatformUnitName"
                  value={formData.systemPlatformUnitName}
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-4">
              <FormGroup>
                <Label htmlFor="unitCode" className="text-primary">
                  單位代碼
                </Label>
                <Input type="text" id="unitCode" name="unitCode" value={formData.unitCode} disabled />
              </FormGroup>
            </div>
            <div className="col-4">
              <FormGroup>
                <Label htmlFor="unitName" className="text-primary">
                  單位名稱
                </Label>
                <Input type="text" id="unitName" name="unitName" value={formData.unitName} disabled />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <FormGroup>
                <Label htmlFor="responsiblePerson1" className="text-primary">
                  局承辦人-1
                </Label>
                <Select
                  id="responsiblePerson1"
                  name="responsiblePerson1"
                  onChange={(e) => {
                    let updateObj = { responsiblePerson1: e.target.value };
                    if (e.target.value && e.target.value == formData.responsiblePerson2)
                      updateObj = Object.assign(updateObj, { responsiblePerson2: '' });
                    if (e.target.value && e.target.value == formData.responsiblePerson3)
                      updateObj = Object.assign(updateObj, { responsiblePerson3: '' });

                    updateFormData(updateObj);
                  }}
                  value={formData.responsiblePerson1}
                  disabled={isLoading}
                  options={getDistinctOptions().responsiblePerson1}
                />
              </FormGroup>
            </div>
            <div className="col-4">
              <FormGroup>
                <Label htmlFor="responsiblePerson2" className="text-primary">
                  局承辦人-2
                </Label>
                <Select
                  id="responsiblePerson2"
                  name="responsiblePerson2"
                  onChange={(e) => {
                    let updateObj = { responsiblePerson2: e.target.value };
                    if (e.target.value && e.target.value == formData.responsiblePerson1)
                      updateObj = Object.assign(updateObj, { responsiblePerson1: '' });
                    if (e.target.value && e.target.value == formData.responsiblePerson3)
                      updateObj = Object.assign(updateObj, { responsiblePerson3: '' });

                    updateFormData(updateObj);
                  }}
                  value={formData.responsiblePerson2}
                  disabled={isLoading}
                  options={getDistinctOptions().responsiblePerson2}
                />
              </FormGroup>
            </div>
            <div className="col-4">
              <FormGroup>
                <Label htmlFor="responsiblePerson3" className="text-primary">
                  局承辦人-3
                </Label>
                <Select
                  id="responsiblePerson3"
                  name="responsiblePerson3"
                  onChange={(e) => {
                    let updateObj = { responsiblePerson3: e.target.value };
                    if (e.target.value && e.target.value == formData.responsiblePerson1)
                      updateObj = Object.assign(updateObj, { responsiblePerson1: '' });
                    if (e.target.value && e.target.value == formData.responsiblePerson2)
                      updateObj = Object.assign(updateObj, { responsiblePerson2: '' });

                    updateFormData(updateObj);
                  }}
                  value={formData.responsiblePerson3}
                  disabled={isLoading}
                  options={getDistinctOptions().responsiblePerson3}
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <FormGroup>
                <Label htmlFor="updateUserId" className="text-primary">
                  最後異動人員帳號
                </Label>
                <Input
                  type="text"
                  id="updateUserId"
                  name="updateUserId"
                  value={formData.updateUserId}
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-4">
              <FormGroup>
                <Label htmlFor="updateUserName" className="text-primary">
                  最後異動人員名稱
                </Label>
                <Input
                  type="text"
                  id="updateUserName"
                  name="updateUserName"
                  value={formData.updateUserName}
                  disabled
                />
              </FormGroup>
            </div>
            <div className="col-4">
              <FormGroup>
                <Label htmlFor="updateTime" className="text-primary">
                  最後異動時間
                </Label>
                <Input type="text" id="updateTime" name="updateTime" value={formData.updateTime} disabled />
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
            closeSystemUnitRespPersonEditModal();
          }}
          disabled={isLoading}
        >
          取消
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleSystemUnitRespPersonEditFormSubmit(formData)}
        >
          更新
        </button>
      </Modal.Footer>
    </Modal>
  );
};
