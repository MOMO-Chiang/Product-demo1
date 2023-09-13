import { FormGroup, Label, Input, useForm, Select, SelectOption } from '@src/components/form';
import { Modal } from '@src/components/modal';
import { usePageActionContext, usePageStateContext } from '../context';
import { BasicCodeModel, BasicCodeCreateModel } from '../types';
import { useEffect } from 'react';

export const BasicCodeCreateModal = () => {
  const { isShowBasicCodeCreateModal, categoryCodeSelectOptions } = usePageStateContext();
  const { closeBasicCodeCreateModal, handleBasicCodeCreateFormSubmit } = usePageActionContext();
  const { formData, updateFormData } = useForm<BasicCodeCreateModel>({
    seq: { initialValue: '系統自動產生', validate: () => ({}) },
    categoryCode: { initialValue: '', validate: () => ({}) },
    value: { initialValue: '', validate: () => ({}) },
    text: { initialValue: '', validate: () => ({}) },
    category: { initialValue: '', validate: () => ({}) },
  });

  /** {value:類別名稱,text:類別名稱代碼} => {value:類別名稱代碼,text:類別名稱代碼} */
  const changeSelectOptions =  categoryCodeSelectOptions.map(function(selectOption:SelectOption){ return {
    text: selectOption.value,
    value: selectOption.value, 
  }});

  /** 取得類別名稱 */
  const getCategory = (categoryCode:string) => {
    const category = categoryCodeSelectOptions.find((item)=>item.value == categoryCode);
    if(category != null) return category?.text;
    else return '';
  };

  /** 設定初始類別項目的類別名稱 */
  useEffect(() => {
    if (categoryCodeSelectOptions.length > 0) {
      updateFormData({
        category: categoryCodeSelectOptions[0].text,
        categoryCode: categoryCodeSelectOptions[0].value,
      });
    } else {
      updateFormData({
        category: '',
      });
    }
  }, [categoryCodeSelectOptions]);

  return (
    <Modal show={isShowBasicCodeCreateModal} size="lg">
      <Modal.Header className="d-block">
        <div className="d-flex">
          <Modal.Title>新增基礎代碼維護資料</Modal.Title>
          <Modal.CloseButton onClick={closeBasicCodeCreateModal}></Modal.CloseButton>
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
                <Label htmlFor="categoryCode" className="text-primary">
                類別代碼
                </Label>
                <Select
                  id="categoryCode"
                  name="categoryCode"
                  onChange={(e) => updateFormData({ categoryCode: e.target.value, category: getCategory(e.target.value) })}
                  value={formData.categoryCode}
                  options={changeSelectOptions}
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
                <Label htmlFor="value">顯示名稱代碼</Label>
                <Input
                  type="text"
                  id="value"
                  name="value"
                  onChange={(e) => updateFormData({ value: e.target.value })}
                  value={formData.value}
                />
              </FormGroup>
            </div>
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-light btn-width-lg" 
                  onClick={() => {closeBasicCodeCreateModal();}}>
            取消
          </button>
          <button type="submit" className="btn btn-primary btn-width-lg me-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBasicCodeCreateFormSubmit(formData)
                  }}
                >
            新增
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
