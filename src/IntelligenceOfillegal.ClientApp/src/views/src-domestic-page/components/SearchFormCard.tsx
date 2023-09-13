import { FormGroup, Label, Input, useForm } from '@src/components/form';
import { SearchButton } from '@src/components/search-button';
import { SearchCard } from '@src/components/search-card';
import { usePageActionContext, usePageStateContext } from '../context';
import { SearchCardForm } from '../types';

export const SearchFormCard = () => {
  const { isLoading } = usePageStateContext();
  const { handleSearchFormSubmit } = usePageActionContext();

  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<SearchCardForm>({
    intelligenceNo: { initialValue: '', validate: () => ({}) },
    supervisorName: { initialValue: '', validate: () => ({}) },
    fileNo: { initialValue: '', validate: () => ({}) },
    caseNo: { initialValue: '', validate: () => ({}) },
    caseName: { initialValue: '', validate: () => ({}) },
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
              <Label htmlFor="intelligenceNo">國內處情資編號</Label>
              <Input
                type="text"
                id="intelligenceNo"
                name="intelligenceNo"
                onChange={(e) => updateFormData({ intelligenceNo: e.target.value })}
                value={formData.intelligenceNo}
                disabled={isLoading}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="supervisorName">國內處承辦人</Label>
              <Input
                type="text"
                id="supervisorName"
                name="supervisorName"
                onChange={(e) => updateFormData({ supervisorName: e.target.value })}
                value={formData.supervisorName}
                disabled={isLoading}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="fileNo">國情文號(原國內處檔號)</Label>
              <Input
                type="text"
                id="fileNo"
                name="fileNo"
                onChange={(e) => updateFormData({ fileNo: e.target.value })}
                value={formData.fileNo}
                disabled={isLoading}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="caseNo">國內處案號</Label>
              <Input
                type="text"
                id="caseNo"
                name="caseNo"
                onChange={(e) => updateFormData({ caseNo: e.target.value })}
                value={formData.caseNo}
                disabled={isLoading}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="caseName">國內處案名</Label>
              <Input
                type="text"
                id="caseName"
                name="caseName"
                onChange={(e) => updateFormData({ caseName: e.target.value })}
                value={formData.caseName}
                disabled={isLoading}
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
