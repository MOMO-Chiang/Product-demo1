import { FormGroup, Label, Input, useForm, Select } from '@src/components/form';
import { SearchButton } from '@src/components/search-button';
import { SearchCard } from '@src/components/search-card';
import { usePageActionContext, usePageStateContext } from '../context';
import { SearchCardForm, PERMISSION_OPTION } from '../types';

export const SearchFormCard = () => {
  const { isLoading } = usePageStateContext();
  const { handleSearchFormSubmit } = usePageActionContext();

  /** 身分別功能權限 下拉選單  增加全部查詢選項 */
  const PERMISSION_OPTION_SEARCH = [{ text: '全部', value: '0' },...PERMISSION_OPTION];

  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<SearchCardForm>({
    userId: { initialValue: '', validate: () => ({}) },
    userName: { initialValue: '', validate: () => ({}) },
    unitCode: { initialValue: '', validate: () => ({}) },
    unitName: { initialValue: '', validate: () => ({}) },
    permission: { initialValue: '', validate: () => ({}) },
  });

  return (
    <SearchCard>
      <form
        className="container-fluid"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchFormSubmit(formData);
        }}
      >
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="unitName">單位名稱</Label>
              <Input
                type="text"
                id="unitName"
                name="unitName"
                onChange={(e) => updateFormData({ unitName: e.target.value })}
                value={formData.unitName}
                disabled={isLoading}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="permission">身分別功能權限</Label>
              <Select
                id="permission"
                name="permission"
                options={PERMISSION_OPTION_SEARCH}
                onChange={(e) => updateFormData({ permission: e.target.value })}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <SearchButton type="submit" disabled={isLoading} />
          </div>
        </div>
      </form>
    </SearchCard>
  );
};
