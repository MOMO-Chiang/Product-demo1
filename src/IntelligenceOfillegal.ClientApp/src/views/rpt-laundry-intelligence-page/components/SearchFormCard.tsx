import { DatePicker, FormGroup, Label, Input, useForm } from '@src/components/form';
import { SearchButton } from '@src/components/search-button';
import { SearchCard } from '@src/components/search-card';
import { usePageActionContext, usePageStateContext } from '../context';
import { SearchCardForm } from '../types';

export const SearchFormCard = () => {
  const { isLoading } = usePageStateContext();
  const { handleSearchFormSubmit } = usePageActionContext();

  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<SearchCardForm>({
    setFileStartDate: { initialValue: '', validate: () => ({}) },
    setFileEndDate: { initialValue: '', validate: () => ({}) },
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
              <Label htmlFor="setFileStartDate">提報日期(起)</Label>
              <DatePicker
                id="setFileStartDate"
                name="setFileStartDate"
                onChange={(e) => updateFormData({ setFileStartDate: e })}
                value={formData.setFileStartDate}
                disabled={isLoading}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="setFileEndDate">提報日期(訖)</Label>
              <DatePicker
                id="setFileEndDate"
                name="setFileEndDate"
                onChange={(e) => updateFormData({ setFileEndDate: e })}
                value={formData.setFileEndDate}
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
