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
    unitCode: { initialValue: '', validate: () => ({}) },
    unitName: { initialValue: '', validate: () => ({}) },
    responsiblePerson: { initialValue: '', validate: () => ({}) },
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
              <Label htmlFor="unitCode">單位代碼(轄區)</Label>
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
              <Label htmlFor="unitName">單位名稱(轄區)</Label>
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
              <Label htmlFor="responsiblePerson">局承辦人</Label>
              <Input
                type="text"
                id="responsiblePerson"
                name="responsiblePerson"
                onChange={(e) => updateFormData({ responsiblePerson: e.target.value })}
                value={formData.responsiblePerson}
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
