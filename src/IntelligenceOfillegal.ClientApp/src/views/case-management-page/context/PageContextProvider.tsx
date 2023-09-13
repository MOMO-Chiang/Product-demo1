import { FC, ReactNode, useState } from 'react';
import { PageActionContext } from './PageActionContext';
import { PageStateContext } from './PageStateContext';
import { CaseManagementModel, SearchCardForm } from '../types';
import {
  PageChangeHandler,
  PageSizeSelectChangeHandler,
  SortChangeHandler,
  useAjaxDataGrid,
} from '@src/components/data-grid';
import { SelectOptionConfig, SortedType } from '@src/shared/enums';
import { DEFAULT_PAGE } from '@src/shared/constants';
import { Alert } from '@src/libs/alert';
import { fetchCaseManagementList } from '../case-management.service';
import { useGlobalSpinner } from '@src/modules/global-spinner';
import { fetchCaseManagementSelectOptions } from '@src/views/case-management-edit-page/case-management-edit.service';

export interface PageContextProviderProps {
  children: ReactNode;
}

export const PageContextProvider: FC<PageContextProviderProps> = ({ children }) => {
  const DEFAULT_OPTION = [{ text: '全部', value: '' }];
  const [isLoading, setIsLoading] = useState(false);
  const { showSpinner, hideSpinner } = useGlobalSpinner();
  const [caseCategorySelectOptions, setCaseCategorySelectOptions] = useState<SelectOptionConfig[]>([]);
  const [investigateProgressSelectOptions, setInvestigateProgressSelectOptions] = useState<
    SelectOptionConfig[]
  >([]);
  const [actualSearchFormData, setActualSearchFormData] = useState<SearchCardForm>({
    caseCategory: '',
    intelligenceNo: '',
    investigateProgressCode: '',
    itlgSrcCaseName: '',
    mainSuspectName: '',
    itlgSrcReportUnitCode: '',
    createTimeStart: '',
    createTimeEnd: '',
    key: '',
  });
  /** Grid 資料 */
  const {
    pkField,
    gridData,
    paginatedInfoModel,
    sortedModel,
    setGridData,
    setPaginatedInfoModel,
    setSortedModel,
  } = useAjaxDataGrid<CaseManagementModel, number>({ pkField: 'seq' });

  /** 搜尋分頁列表資料 */
  const fetchPaginatedTestCaseList = async (params: {
    searchFormData: SearchCardForm;
    page: number;
    pageSize: number;
    sortedColumn: string;
    sortedType: SortedType;
  }) => {
    const { searchFormData, page, pageSize, sortedColumn, sortedType } = params;
    let newPaginatedInfoModel = { ...paginatedInfoModel, page, pageSize };

    // 更新當前實際的搜尋條件資料
    setActualSearchFormData(searchFormData);

    // 更新排序資料
    setSortedModel({ sortedColumn, sortedType });

    setIsLoading(true);

    try {
      // 取得資料
      const respData = await fetchCaseManagementList({
        page,
        pageSize,
        sortedColumn,
        sortedType,
        caseCategory: searchFormData.caseCategory,
        intelligenceNo: searchFormData.intelligenceNo,
        investigateProgressCode: searchFormData.investigateProgressCode,
        itlgSrcCaseName: searchFormData.itlgSrcCaseName,
        mainSuspectName: searchFormData.mainSuspectName,
        itlgSrcReportUnitCode: searchFormData.itlgSrcReportUnitCode,
        createTimeStart: searchFormData.createTimeStart,
        createTimeEnd: searchFormData.createTimeEnd,
        key: searchFormData.key,
      });
      setIsLoading(false);

      // 更新 Grid 資料
      setGridData(respData.data);

      newPaginatedInfoModel = respData.paginatedInfo;
    } catch (err) {
      const error = err as Error;

      setIsLoading(false);

      // 更新 Grid 資料
      setGridData([]);

      // 顯示錯誤訊息
      await Alert.showError('取得列表資料時發生錯誤', error.message);
    }

    // 更新分頁資料
    setPaginatedInfoModel(newPaginatedInfoModel);
  };

  /** 搜尋按鈕事件 */
  const handleSearchFormSubmit = async (searchFormData: SearchCardForm) => {
    await fetchPaginatedTestCaseList({
      searchFormData,
      page: DEFAULT_PAGE,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理分頁大小變更事件 */
  const handlePageSizeChange: PageSizeSelectChangeHandler = async (pageSize) => {
    await fetchPaginatedTestCaseList({
      searchFormData: actualSearchFormData,
      page: DEFAULT_PAGE,
      pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理換頁事件 */
  const handlePageChange: PageChangeHandler = async (page) => {
    await fetchPaginatedTestCaseList({
      searchFormData: actualSearchFormData,
      page,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理排序變更事件 */
  const handleSortChange: SortChangeHandler = async (_sortedModel) => {
    await fetchPaginatedTestCaseList({
      searchFormData: actualSearchFormData,
      page: paginatedInfoModel.page,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: _sortedModel.sortedColumn,
      sortedType: _sortedModel.sortedType,
    });
  };

  const initPageData = async () => {
    // 載入頁面先 fetch 下拉選單 & 取得情資編號
    const caseManagementSelectOptions = await fetchCaseManagementSelectOptions();
    setCaseCategorySelectOptions(
      DEFAULT_OPTION.concat(caseManagementSelectOptions.caseCategorySelectOptions),
    );
    setInvestigateProgressSelectOptions(
      DEFAULT_OPTION.concat(caseManagementSelectOptions.investigateProgressSelectOptions),
    );
    // 載入頁面先 fetch 第一頁資料
    await fetchPaginatedTestCaseList({
      searchFormData: actualSearchFormData,
      page: paginatedInfoModel.page,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  return (
    <PageStateContext.Provider
      value={{
        isLoading,
        pkField,
        gridData,
        paginatedInfoModel,
        sortedModel,
        caseCategorySelectOptions,
        investigateProgressSelectOptions,
      }}
    >
      <PageActionContext.Provider
        value={{
          initPageData,
          handleSearchFormSubmit,
          handlePageSizeChange,
          handlePageChange,
          handleSortChange,
        }}
      >
        {children}
      </PageActionContext.Provider>
    </PageStateContext.Provider>
  );
};
