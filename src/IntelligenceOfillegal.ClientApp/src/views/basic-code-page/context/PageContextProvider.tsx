import { FC, ReactNode, useEffect, useState } from 'react';
import { PageActionContext } from './PageActionContext';
import { PageStateContext } from './PageStateContext';
import { SearchCardForm, BasicCodeModel, BasicCodeCreateModel, BasicCodeEditModel, BasicCodeUpdateModel } from '../types';
import {
  PageChangeHandler,
  PageSizeSelectChangeHandler,
  SortChangeHandler,
  useAjaxDataGrid,
} from '@src/components/data-grid';
import { SortedType } from '@src/shared/enums';
import { DEFAULT_PAGE } from '@src/shared/constants';
import { Alert } from '@src/libs/alert';
import { fetchBasicCode, createBasicCode, updateBasicCodeByValue, editBasicCodeByValue, fetchCategoryCode } from '../basic-code.service';
import { useGlobalSpinner } from '@src/modules/global-spinner';
import { SelectOption } from '@src/components/form';

export interface PageContextProviderProps {
  children: ReactNode;
}

export const PageContextProvider: FC<PageContextProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSpinner, hideSpinner } = useGlobalSpinner();
  const [isShowBasicCodeEditModal, setIsShowBasicCodeEditModal] = useState(false);
  const [isShowBasicCodeUpdateModal, setIsShowBasicCodeUpdateModal] = useState(false);
  const [isShowBasicCodeCreateModal, setIsShowBasicCodeCreateModal] = useState(false);
  const [actualSearchFormData, setActualSearchFormData] = useState<SearchCardForm>({
    category: '',
    categoryCode: '',
  });
  const [selectedBasicCode, setSelectedBasicCode] = useState<BasicCodeModel | null>(null);
  const [categoryCodeSelectOptions, setCategoryCodeSelectOptions] = useState<SelectOption[]>([]);

  /** Grid 資料 */
  const {
    pkField,
    gridData,
    paginatedInfoModel,
    sortedModel,
    setGridData,
    setPaginatedInfoModel,
    setSortedModel,
  } = useAjaxDataGrid<BasicCodeModel, number>({ pkField: 'value' });

  /** 搜尋分頁列表資料 */
  const fetchPaginatedBasicCode = async (params: {
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
      const respData = await fetchBasicCode({
        page,
        pageSize,
        sortedColumn,
        sortedType,
        category: searchFormData.category,
        categoryCode: searchFormData.categoryCode,
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
    await fetchPaginatedBasicCode({
      searchFormData,
      page: DEFAULT_PAGE,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理分頁大小變更事件 */
  const handlePageSizeChange: PageSizeSelectChangeHandler = async (pageSize) => {
    await fetchPaginatedBasicCode({
      searchFormData: actualSearchFormData,
      page: DEFAULT_PAGE,
      pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理換頁事件 */
  const handlePageChange: PageChangeHandler = async (page) => {
    await fetchPaginatedBasicCode({
      searchFormData: actualSearchFormData,
      page,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理排序變更事件 */
  const handleSortChange: SortChangeHandler = async (_sortedModel) => {
    await fetchPaginatedBasicCode({
      searchFormData: actualSearchFormData,
      page: paginatedInfoModel.page,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: _sortedModel.sortedColumn,
      sortedType: _sortedModel.sortedType,
    });
  };

  /** 處理更正 Submit 事件 */
  const handleActivedChange = async (data: BasicCodeModel) => {

    try {
      await updateBasicCodeByValue(data);
      await Alert.showSuccess('更正完成。');

      /** 重新刷新分頁列表資料 */
      await fetchPaginatedBasicCode({
        searchFormData: actualSearchFormData,
        page: paginatedInfoModel.page,
        pageSize: paginatedInfoModel.pageSize,
        sortedColumn: sortedModel.sortedColumn,
        sortedType: sortedModel.sortedType,
      });

    } catch (error) {
      await Alert.showError('更正基礎代碼發生錯誤:', (error as Error).message);
    }
  };

  /** 關閉 BasicCodeEditModal */
  const closeBasicCodeEditModal = () => {
    setIsShowBasicCodeEditModal(false);
    // 清空 選取的資料
    setSelectedBasicCode(null);
  };

  /** 處理編輯按鈕 Click 事件 */
  const handleBasicCodeEditBtnClick = async (data: BasicCodeModel) => {
    // 設定 選取的資料
    setSelectedBasicCode(data);
    // 開啟 BasicCodeEditModal
    setIsShowBasicCodeEditModal(true);
  };

  /** 處理編輯 Submit 事件 */
  const handleBasicCodeEditFormSubmit = async (editModel: BasicCodeEditModel) => {
    showSpinner();

    try {
      await editBasicCodeByValue(editModel);
      hideSpinner();
      closeBasicCodeEditModal();
      await Alert.showSuccess('修改完成。');

      /** 重新刷新分頁列表資料 */
      await fetchPaginatedBasicCode({
        searchFormData: actualSearchFormData,
        page: paginatedInfoModel.page,
        pageSize: paginatedInfoModel.pageSize,
        sortedColumn: sortedModel.sortedColumn,
        sortedType: sortedModel.sortedType,
      });

    } catch (error) {
      hideSpinner();
      closeBasicCodeEditModal();
      await Alert.showError('修改基礎代碼發生錯誤:', (error as Error).message);
    }
  };

  /** 關閉 BasicCodeCreateModal */
  const closeBasicCodeCreateModal = () => {
    setIsShowBasicCodeCreateModal(false);
    // 清空 選取的資料
    //setSelectedBasicCode(null);
  };

  /** 處理新增按鈕 Click 事件 */
  const handleBasicCodeCreateBtnClick = async () => {
    // 設定 選取的資料
    //setSelectedBasicCode(data);
    // 開啟 BasicCodeCreateModal
    setIsShowBasicCodeCreateModal(true);
  };

  /** 處理新增 Submit 事件 */
  const handleBasicCodeCreateFormSubmit = async (createModel: BasicCodeCreateModel) => {
    showSpinner();

    try {
      await createBasicCode(createModel);
      hideSpinner();
      closeBasicCodeCreateModal();
      await Alert.showSuccess('新增完成。');

      /** 重新刷新分頁列表資料 */
      await fetchPaginatedBasicCode({
        searchFormData: actualSearchFormData,
        page: paginatedInfoModel.page,
        pageSize: paginatedInfoModel.pageSize,
        sortedColumn: sortedModel.sortedColumn,
        sortedType: sortedModel.sortedType,
      });

    } catch (error) {
      hideSpinner();
      closeBasicCodeEditModal();
      await Alert.showError('新增基礎代碼發生錯誤:', (error as Error).message);
    }
  };

  const initPageData = async () => {
    
    try {
      // 取得 類別項目下拉選單的資料
      var respData = await fetchCategoryCode();
      setCategoryCodeSelectOptions(respData);

      // 載入頁面先 fetch 第一頁資料
      await fetchPaginatedBasicCode({
      searchFormData: {
        category: respData[0].text,
        categoryCode: respData[0].value, 
      },
      page: paginatedInfoModel.page,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
      });
    } catch (err) {
      const error = err as Error;
      // 顯示錯誤訊息
      await Alert.showError(' 取得類別項目清單並載入頁面時發生錯誤', error.message);
    }
  };

  return (
    <PageStateContext.Provider
      value={{
        isLoading,
        pkField,
        gridData,
        paginatedInfoModel,
        sortedModel,
        isShowBasicCodeCreateModal,
        isShowBasicCodeEditModal,
        isShowBasicCodeUpdateModal,
        selectedBasicCode,
        categoryCodeSelectOptions,
      }}
    >
      <PageActionContext.Provider
        value={{
          initPageData,
          handleSearchFormSubmit,
          handlePageSizeChange,
          handlePageChange,
          handleSortChange,
          handleActivedChange,
          closeBasicCodeCreateModal,
          handleBasicCodeCreateBtnClick,
          handleBasicCodeCreateFormSubmit,
          closeBasicCodeEditModal,
          handleBasicCodeEditBtnClick,
          handleBasicCodeEditFormSubmit,
        }}
      >
        {children}
      </PageActionContext.Provider>
    </PageStateContext.Provider>
  );
};
