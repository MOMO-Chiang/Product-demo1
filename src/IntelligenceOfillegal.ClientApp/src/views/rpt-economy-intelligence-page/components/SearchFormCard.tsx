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
    itlgSrcReportUnitName: { initialValue: '', validate: () => ({}) },
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
              <Label htmlFor="setFileStartDate">建檔日期(起)(原收文日期)</Label>
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
              <Label htmlFor="setFileEndDate">建檔日期(迄)(原收文日期)</Label>
              <DatePicker
                id="setFileEndDate"
                name="setFileEndDate"
                onChange={(e) => updateFormData({ setFileEndDate: e })}
                value={formData.setFileEndDate}
                disabled={isLoading}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="itlgSrcReportUnitName">來文單位</Label>
              <Input
                type="text"
                id="itlgSrcReportUnitName"
                name="itlgSrcReportUnitName"
                onChange={(e) => updateFormData({ itlgSrcReportUnitName: e.target.value })}
                value={formData.itlgSrcReportUnitName}
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
