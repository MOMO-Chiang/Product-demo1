import { FC, ReactNode, useEffect, useState } from 'react';
import { PageActionContext } from './PageActionContext';
import { PageStateContext } from './PageStateContext';
import { SearchCardForm, SystemUsersEditModel, SystemUsersModel } from '../types';
import {
  PageChangeHandler,
  PageSizeSelectChangeHandler,
  SortChangeHandler,
  useAjaxDataGrid,
} from '@src/components/data-grid';
import { SortedType } from '@src/shared/enums';
import { DEFAULT_PAGE } from '@src/shared/constants';
import { Alert } from '@src/libs/alert';
import { editSystemUsersByUserId, fetchSystemUsers, updateSystemUsersByUserId } from '../system-users.service';
import { useGlobalSpinner } from '@src/modules/global-spinner';

export interface PageContextProviderProps {
  children: ReactNode;
}

export const PageContextProvider: FC<PageContextProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSpinner, hideSpinner } = useGlobalSpinner();
  const [isShowSystemUsersEditModal, setIsShowSystemUsersEditModal] = useState(false);
  const [isShowSystemUsersUpdateModal, setIsShowSystemUsersUpdateModal] = useState(false);
  const [actualSearchFormData, setActualSearchFormData] = useState<SearchCardForm>({
    userId: '',
    userName: '',
    unitCode: '',
    unitName: '',
    permission: '',
  });
  const [selectedSystemUsers, setSelectedSystemUsers] = useState<SystemUsersModel | null>(null);

  /** Grid 資料 */
  const {
    pkField,
    gridData,
    paginatedInfoModel,
    sortedModel,
    setGridData,
    setPaginatedInfoModel,
    setSortedModel,
  } = useAjaxDataGrid<SystemUsersModel, number>({ pkField: 'userId' });

  /** 搜尋分頁列表資料 */
  const fetchPaginatedSystemUsers = async (params: {
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
      const respData = await fetchSystemUsers({
        page,
        pageSize,
        sortedColumn,
        sortedType,
        userId: searchFormData.userId,
        userName: searchFormData.userName,
        unitCode: searchFormData.unitCode,
        unitName: searchFormData.unitName,
        permission: searchFormData.permission,
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
    await fetchPaginatedSystemUsers({
      searchFormData,
      page: DEFAULT_PAGE,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理分頁大小變更事件 */
  const handlePageSizeChange: PageSizeSelectChangeHandler = async (pageSize) => {
    await fetchPaginatedSystemUsers({
      searchFormData: actualSearchFormData,
      page: DEFAULT_PAGE,
      pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理換頁事件 */
  const handlePageChange: PageChangeHandler = async (page) => {
    await fetchPaginatedSystemUsers({
      searchFormData: actualSearchFormData,
      page,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: sortedModel.sortedColumn,
      sortedType: sortedModel.sortedType,
    });
  };

  /** 處理排序變更事件 */
  const handleSortChange: SortChangeHandler = async (_sortedModel) => {
    await fetchPaginatedSystemUsers({
      searchFormData: actualSearchFormData,
      page: paginatedInfoModel.page,
      pageSize: paginatedInfoModel.pageSize,
      sortedColumn: _sortedModel.sortedColumn,
      sortedType: _sortedModel.sortedType,
    });
  };

  /** 處理更正 Submit 事件 */
  const handleValidChange = async (data: SystemUsersModel) => {

    try {
      await updateSystemUsersByUserId(data);
      await Alert.showSuccess('更正完成。');

      /** 重新刷新分頁列表資料 */
      await fetchPaginatedSystemUsers({
        searchFormData: actualSearchFormData,
        page: paginatedInfoModel.page,
        pageSize: paginatedInfoModel.pageSize,
        sortedColumn: sortedModel.sortedColumn,
        sortedType: sortedModel.sortedType,
      });

    } catch (error) {
      await Alert.showError('更正使用者資料發生錯誤:', (error as Error).message);
    }
  };

  /** 關閉 SystemUsersEditModal */
  const closeSystemUsersEditModal = () => {
    setIsShowSystemUsersEditModal(false);
    // 清空選取的測試案例
    setSelectedSystemUsers(null);
  };

  /** 處理編輯按鈕 Click 事件 */
  const handleEditBtnClick = async (data: SystemUsersModel) => {
    // 設定選取的 SystemUsers 資料
    setSelectedSystemUsers(data);
    // 開啟 SystemUsersEditModal
    setIsShowSystemUsersEditModal(true);
  };

  /** 處理編輯 Submit 事件 */
  const handleSystemUsersEditFormSubmit = async (editModel: SystemUsersEditModel) => {
    showSpinner();

    try {
      await editSystemUsersByUserId(editModel);
      hideSpinner();
      closeSystemUsersEditModal();
      await Alert.showSuccess('修改完成。');

      /** 重新刷新分頁列表資料 */
      await fetchPaginatedSystemUsers({
        searchFormData: actualSearchFormData,
        page: paginatedInfoModel.page,
        pageSize: paginatedInfoModel.pageSize,
        sortedColumn: sortedModel.sortedColumn,
        sortedType: sortedModel.sortedType,
      });

    } catch (error) {
      hideSpinner();
      closeSystemUsersEditModal();
      await Alert.showError('修改使用者資料發生錯誤:', (error as Error).message);
    }
  };

  const initPageData = async () => {
    // 載入頁面先 fetch 第一頁資料
    await fetchPaginatedSystemUsers({
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
        isShowSystemUsersEditModal,
        isShowSystemUsersUpdateModal,
        selectedSystemUsers,
      }}
    >
      <PageActionContext.Provider
        value={{
          initPageData,
          handleSearchFormSubmit,
          handlePageSizeChange,
          handlePageChange,
          handleSortChange,
          handleValidChange,
          closeSystemUsersEditModal,
          handleEditBtnClick,
          handleSystemUsersEditFormSubmit,
        }}
      >
        {children}
      </PageActionContext.Provider>
    </PageStateContext.Provider>
  );
};
