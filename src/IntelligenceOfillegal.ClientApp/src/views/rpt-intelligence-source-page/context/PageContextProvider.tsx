import { FC, ReactNode, useEffect, useState } from 'react';
import { PageActionContext } from './PageActionContext';
import { PageStateContext } from './PageStateContext';
import { SearchCardForm, RptIntelligenceSourceModel } from '../types';
import {
  PageChangeHandler,
  PageSizeSelectChangeHandler,
  SortChangeHandler,
  useAjaxDataGrid,
} from '@src/components/data-grid';
import { SortedType } from '@src/shared/enums';
import { DEFAULT_PAGE } from '@src/shared/constants';
import { Alert } from '@src/libs/alert';
import { fetchRptIntelligenceSourceList, exportExcel } from '../rpt-intelligence-source.service';
import { useGlobalSpinner } from '@src/modules/global-spinner';

export interface PageContextProviderProps {
  children: ReactNode;
}

export const PageContextProvider: FC<PageContextProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSpinner, hideSpinner } = useGlobalSpinner();
  const [actualSearchFormData, setActualSearchFormData] = useState<SearchCardForm>({
    setFileStartDate: '',
    setFileEndDate: '',
    caseType: '',
  });
  const [caseTypeOptions, setCaseTypeOptions] = useState([
    { text: '全部', value: '0' },
    { text: '廉能對象', value: '1' },
    { text: '非廉能對象', value: '2' },
  ]);

  /** Grid 資料 */
  const {
    pkField,
    gridData,
    paginatedInfoModel,
    sortedModel,
    setGridData,
    setPaginatedInfoModel,
    setSortedModel,
  } = useAjaxDataGrid<RptIntelligenceSourceModel, number>({ pkField: 'unitcode' });

  /** 搜尋分頁列表資料 */
  const fetchPaginatedRptIntelligenceSourceList = async (params: {
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
      const respData = await fetchRptIntelligenceSourceList({
        page,
        pageSize,
        sortedColumn,
        sortedType,
        setFileStartDate: searchFormData.setFileStartDate,
        setFileEndDate: searchFormData.setFileEndDate,
        caseType: searchFormData.caseType,
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
    await fetchPaginatedRptIntelligenceSourceList({
      searchFormData,
      page: DEFAULT_PAGE,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理分頁大小變更事件 */
  const handlePageSizeChange: PageSizeSelectChangeHandler = async (pageSize) => {
    await fetchPaginatedRptIntelligenceSourceList({
      searchFormData: actualSearchFormData,
      page: DEFAULT_PAGE,
      pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理換頁事件 */
  const handlePageChange: PageChangeHandler = async (page) => {
    await fetchPaginatedRptIntelligenceSourceList({
      searchFormData: actualSearchFormData,
      page,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理排序變更事件 */
  const handleSortChange: SortChangeHandler = async (_sortedModel) => {
    await fetchPaginatedRptIntelligenceSourceList({
      searchFormData: actualSearchFormData,
      page: paginatedInfoModel.page,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: _sortedModel.sortedColumn,
      sortedType: _sortedModel.sortedType,
    });
  };

  const handleExportExcel = async () => {
    await exportExcel(actualSearchFormData, sortedModel);
  };

  const initPageData = async () => {
    // 載入頁面先 fetch 第一頁資料
    await fetchPaginatedRptIntelligenceSourceList({
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
        caseTypeOptions,
      }}
    >
      <PageActionContext.Provider
        value={{
          initPageData,
          handleSearchFormSubmit,
          handlePageSizeChange,
          handlePageChange,
          handleSortChange,
          handleExportExcel,
        }}
      >
        {children}
      </PageActionContext.Provider>
    </PageStateContext.Provider>
  );
};
