import { PageChangeHandler, PageSizeSelectChangeHandler, SortChangeHandler } from '@src/components/data-grid';
import { createContext, useContext } from 'react';
import { SearchCardForm, SystemUsersEditModel, SystemUsersModel } from '../types';

export interface PageActionContextValue {
  /** 初始頁面資料 */
  initPageData: () => Promise<void>;

  /** 處理搜尋 submit 事件 */
  handleSearchFormSubmit: (formData: SearchCardForm) => Promise<void>;

  /** 處理分頁大小改變事件 */
  handlePageSizeChange: PageSizeSelectChangeHandler;

  /** 處理分頁改變事件 */
  handlePageChange: PageChangeHandler;

  /** 處理排序改變事件 */
  handleSortChange: SortChangeHandler;

  /** 處理直接修改帳號是否有效事件 */
  handleValidChange: (data: SystemUsersModel) => void;

  /** 關閉 SystemUsersEditModal */
  closeSystemUsersEditModal: () => void;

  /** 處理編輯按鈕 Click 事件 */
  handleEditBtnClick: (data: SystemUsersModel) => Promise<void>;

  /** 處理編輯 Submit 事件 */
  handleSystemUsersEditFormSubmit: (editModel: SystemUsersEditModel) => Promise<void>;
}

export const PageActionContext = createContext<PageActionContextValue>({} as PageActionContextValue);

export const usePageActionContext = () => {
  return useContext(PageActionContext);
};
