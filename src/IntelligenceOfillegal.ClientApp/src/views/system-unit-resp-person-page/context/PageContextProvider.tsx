import { FC, ReactNode, useEffect, useState } from 'react';
import { PageActionContext } from './PageActionContext';
import { PageStateContext } from './PageStateContext';
import {
  SearchCardForm,
  SystemUnitRespPersonCreateModel,
  SystemUnitRespPersonEditModel,
  SystemUnitRespPersonModel,
} from '../types';
import {
  PageChangeHandler,
  PageSizeSelectChangeHandler,
  SortChangeHandler,
  useAjaxDataGrid,
} from '@src/components/data-grid';
import { SortedType } from '@src/shared/enums';
import { DEFAULT_PAGE } from '@src/shared/constants';
import { Alert } from '@src/libs/alert';
import {
  fetchSystemUnitRespPerson,
  fetchRespPersonList,
  createSystemUnitRespPerson,
  editSystemUnitRespPersonById,
  deleteSystemUnitRespPersonById,
} from '../system-unit-resp-person.service';
import { useGlobalSpinner } from '@src/modules/global-spinner';
import { SelectOptionConfig } from '@src/shared/types';

export interface PageContextProviderProps {
  children: ReactNode;
}

export const PageContextProvider: FC<PageContextProviderProps> = ({ children }) => {
  /** 預設下拉選單 */
  const DEFAULT_OPTION = [{ text: '--- 無 ---', value: '' }];
  const [isLoading, setIsLoading] = useState(false);
  const { showSpinner, hideSpinner } = useGlobalSpinner();
  const [isShowSystemUnitRespPersonCreateModal, setIsShowSystemUnitRespPersonCtreateModal] = useState(false);
  const [isShowSystemUnitRespPersonEditModal, setIsShowSystemUnitRespPersonEditModal] = useState(false);
  const [isShowSystemUnitRespPersonDeleteModal, setIsShowSystemUnitRespPersonDeleteModal] = useState(false);
  const [actualSearchFormData, setActualSearchFormData] = useState<SearchCardForm>({
    unitCode: '',
    unitName: '',
    responsiblePerson: '',
  });
  const [selectedSystemUnitRespPerson, setSelectedSystemUnitRespPerson] =
    useState<SystemUnitRespPersonModel | null>(null);
  const [responsiblePersonOptions, setResponsiblePersonOptions] = useState<SelectOptionConfig[]>([]);

  /** Grid 資料 */
  const {
    pkField,
    gridData,
    paginatedInfoModel,
    sortedModel,
    setGridData,
    setPaginatedInfoModel,
    setSortedModel,
  } = useAjaxDataGrid<SystemUnitRespPersonModel, number>({ pkField: 'seq' });

  /** 搜尋分頁列表資料 */
  const fetchPaginatedSystemUnitRespPerson = async (params: {
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
      const respData = await fetchSystemUnitRespPerson({
        page,
        pageSize,
        sortedColumn,
        sortedType,
        unitCode: searchFormData.unitCode,
        unitName: searchFormData.unitName,
        responsiblePerson: searchFormData.responsiblePerson,
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
    await fetchPaginatedSystemUnitRespPerson({
      searchFormData,
      page: DEFAULT_PAGE,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理分頁大小變更事件 */
  const handlePageSizeChange: PageSizeSelectChangeHandler = async (pageSize) => {
    await fetchPaginatedSystemUnitRespPerson({
      searchFormData: actualSearchFormData,
      page: DEFAULT_PAGE,
      pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理換頁事件 */
  const handlePageChange: PageChangeHandler = async (page) => {
    await fetchPaginatedSystemUnitRespPerson({
      searchFormData: actualSearchFormData,
      page,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理排序變更事件 */
  const handleSortChange: SortChangeHandler = async (_sortedModel) => {
    await fetchPaginatedSystemUnitRespPerson({
      searchFormData: actualSearchFormData,
      page: paginatedInfoModel.page,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: _sortedModel.sortedColumn,
      sortedType: _sortedModel.sortedType,
    });
  };

  /** 關閉 SystemUnitRespPersonCreateModal */
  const closeSystemUnitRespPersonCreateModal = () => {
    setIsShowSystemUnitRespPersonCtreateModal(false);
  };

  /** 處理新增 */
  const handleCreateBtnClick = () => {
    setIsShowSystemUnitRespPersonCtreateModal(true);
  };

  /** 處理新增 Submit 事件 */
  const handleSystemUnitRespPersonCreateFormSubmit = async (createModel: SystemUnitRespPersonCreateModel) => {
    showSpinner();

    try {
      await createSystemUnitRespPerson(createModel);
      hideSpinner();
      closeSystemUnitRespPersonCreateModal();
      await Alert.showSuccess('新增完成。');
      await initPageData();

      // 清空選取的人員
      setSelectedSystemUnitRespPerson(null);
    } catch (error) {
      hideSpinner();
      closeSystemUnitRespPersonCreateModal();
      await Alert.showError('新增人員發生錯誤:', (error as Error).message);
    }
  };

  /** 關閉 SystemUnitRespPersonEditModal */
  const closeSystemUnitRespPersonEditModal = () => {
    setIsShowSystemUnitRespPersonEditModal(false);

    // 清空選取的人員
    setSelectedSystemUnitRespPerson(null);
  };

  /** 處理編輯按鈕 Click 事件 */
  const handleEditBtnClick = async (data: SystemUnitRespPersonModel) => {
    // 設定選取的 SystemUnitRespPerson 資料
    setSelectedSystemUnitRespPerson(data);

    const { unitCode } = data;
    const respData = await fetchRespPersonList({ unitCode });
    setResponsiblePersonOptions([...DEFAULT_OPTION, ...respData]);

    // 開啟 SystemUnitRespPersonEditModal
    setIsShowSystemUnitRespPersonEditModal(true);
  };

  /** 處理編輯 Submit 事件 */
  const handleSystemUnitRespPersonEditFormSubmit = async (editModel: SystemUnitRespPersonEditModel) => {
    showSpinner();

    try {
      await editSystemUnitRespPersonById(editModel);

      hideSpinner();
      closeSystemUnitRespPersonEditModal();
      await Alert.showSuccess('修改完成。');
      await initPageData();
    } catch (error) {
      hideSpinner();
      closeSystemUnitRespPersonEditModal();
      await Alert.showError('修改發生錯誤:', (error as Error).message);
    }
  };

  /** 關閉 SystemUnitRespPersonDeleteModal */
  const closeSystemUnitRespPersonDeleteModal = () => {
    setIsShowSystemUnitRespPersonDeleteModal(false);

    // 清空選取的人員
    setSelectedSystemUnitRespPerson(null);
  };

  /** 處理刪除按鈕 Click 事件 */
  const handleDeleteBtnClick = async (data: SystemUnitRespPersonModel) => {
    // 設定選取的 SystemUnitRespPerson 資料
    setSelectedSystemUnitRespPerson(data);
    // 開啟 SystemUnitRespPersonDeleteModal
    setIsShowSystemUnitRespPersonDeleteModal(true);
  };

  /** 處理刪除 Submit 事件 */
  const handleSystemUnitRespPersonDeleteFormSubmit = async (deleteModel: SystemUnitRespPersonModel) => {
    showSpinner();

    try {
      await deleteSystemUnitRespPersonById(deleteModel);
      hideSpinner();
      closeSystemUnitRespPersonDeleteModal();
      await Alert.showSuccess('刪除完成。');
      await initPageData();
    } catch (error) {
      hideSpinner();
      closeSystemUnitRespPersonDeleteModal();
      await Alert.showError('刪除人員發生錯誤:', (error as Error).message);
    }
  };

  const initPageData = async () => {
    // 載入頁面先 fetch 第一頁資料
    await fetchPaginatedSystemUnitRespPerson({
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
        isShowSystemUnitRespPersonCreateModal,
        isShowSystemUnitRespPersonEditModal,
        isShowSystemUnitRespPersonDeleteModal,
        selectedSystemUnitRespPerson,
        responsiblePersonOptions,
      }}
    >
      <PageActionContext.Provider
        value={{
          initPageData,
          handleSearchFormSubmit,
          handlePageSizeChange,
          handlePageChange,
          handleSortChange,
          closeSystemUnitRespPersonCreateModal,
          handleCreateBtnClick,
          handleSystemUnitRespPersonCreateFormSubmit,
          closeSystemUnitRespPersonEditModal,
          handleEditBtnClick,
          handleSystemUnitRespPersonEditFormSubmit,
          closeSystemUnitRespPersonDeleteModal,
          handleDeleteBtnClick,
          handleSystemUnitRespPersonDeleteFormSubmit,
        }}
      >
        {children}
      </PageActionContext.Provider>
    </PageStateContext.Provider>
  );
};
