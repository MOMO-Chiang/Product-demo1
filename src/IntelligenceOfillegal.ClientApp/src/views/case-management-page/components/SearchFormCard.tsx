import { FormGroup, Label, Input, useForm, DatePicker, Select } from '@src/components/form';
import { SearchButton } from '@src/components/search-button';
import { SearchCard } from '@src/components/search-card';
import { usePageActionContext, usePageStateContext } from '../context';
import { SearchCardForm } from '../types';

export const SearchFormCard = () => {
  const { isLoading, caseCategorySelectOptions, investigateProgressSelectOptions } = usePageStateContext();
  const { handleSearchFormSubmit } = usePageActionContext();

  /** SearchCard Form 欄位資料 */
  const { formData, updateFormData } = useForm<SearchCardForm>({
    caseCategory: { initialValue: '', validate: () => ({}) },
    intelligenceNo: { initialValue: '', validate: () => ({}) },
    investigateProgressCode: { initialValue: '', validate: () => ({}) },
    itlgSrcCaseName: { initialValue: '', validate: () => ({}) },
    mainSuspectName: { initialValue: '', validate: () => ({}) },
    itlgSrcReportUnitCode: { initialValue: '', validate: () => ({}) },
    createTimeStart: { initialValue: '', validate: () => ({}) },
    createTimeEnd: { initialValue: '', validate: () => ({}) },
    key: { initialValue: '', validate: () => ({}) },
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
              <Label htmlFor="caseCategory">分案類別</Label>
              <Select
                id="caseCategory"
                name="caseCategory"
                onChange={(e) => updateFormData({ caseCategory: e.target.value })}
                value={formData.caseCategory}
                disabled={isLoading}
                options={caseCategorySelectOptions}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="intelligenceNo">不法情資編號</Label>
              <i className="fas fa-question-circle fa-spin fa-lg" style={{ color: 'red' }} title="模糊搜尋" />
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
              <Label htmlFor="investigateProgressCode">調查進度</Label>
              <Select
                id="investigateProgressCode"
                name="investigateProgressCode"
                onChange={(e) => updateFormData({ investigateProgressCode: e.target.value })}
                value={formData.investigateProgressCode}
                disabled={isLoading}
                options={investigateProgressSelectOptions}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="itlgSrcCaseName">主旨</Label>
              <i className="fas fa-question-circle fa-spin fa-lg" style={{ color: 'red' }} title="模糊搜尋" />
              <Input
                type="text"
                id="itlgSrcCaseName"
                name="itlgSrcCaseName"
                onChange={(e) => updateFormData({ itlgSrcCaseName: e.target.value })}
                value={formData.itlgSrcCaseName}
                disabled={isLoading}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="mainSuspectName">主要對象</Label>
              <i className="fas fa-question-circle fa-spin fa-lg" style={{ color: 'red' }} title="模糊搜尋" />
              <Input
                type="text"
                id="mainSuspectName"
                name="mainSuspectName"
                onChange={(e) => updateFormData({ mainSuspectName: e.target.value })}
                value={formData.mainSuspectName}
                disabled={isLoading}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="itlgSrcReportUnitCode">提報單位</Label>
              <i className="fas fa-question-circle fa-spin fa-lg" style={{ color: 'red' }} title="模糊搜尋" />
              <Input
                type="text"
                id="itlgSrcReportUnitCode"
                name="itlgSrcReportUnitCode"
                onChange={(e) => updateFormData({ itlgSrcReportUnitCode: e.target.value })}
                value={formData.itlgSrcReportUnitCode}
                disabled={isLoading}
              />
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="createTimeStart">提報日期(起)</Label>
              <DatePicker
                id="createTimeStart"
                name="createTimeStart"
                format="yyyy/MM/dd"
                placeholder="年/月/日"
                onChange={(e) => updateFormData({ createTimeStart: e })}
                value={formData.createTimeStart}
                disabled={isLoading}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="createTimeEnd">提報日期(迄)</Label>
              <DatePicker
                id="createTimeEnd"
                name="createTimeEnd"
                format="yyyy/MM/dd"
                placeholder="年/月/日"
                onChange={(e) => updateFormData({ createTimeEnd: e })}
                value={formData.createTimeEnd}
                disabled={isLoading}
              />
            </FormGroup>
          </div>

          <div className="col-12 col-sm-6 col-md-4">
            <FormGroup>
              <Label htmlFor="key">關鍵字</Label>
              <i
                className="fas fa-question-circle fa-spin fa-lg"
                style={{ color: 'red' }}
                title="檢索範圍：模糊搜尋，個人承辦情資之情資主旨、對象、內容及備註。"
              />
              <Input
                type="text"
                id="key"
                name="key"
                onChange={(e) => updateFormData({ key: e.target.value })}
                value={formData.key}
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
