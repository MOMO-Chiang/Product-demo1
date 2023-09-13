import { PageChangeHandler, PageSizeSelectChangeHandler, SortChangeHandler } from '@src/components/data-grid';
import { createContext, useContext } from 'react';
import {
  SearchCardForm,
  SystemUnitRespPersonModel,
  SystemUnitRespPersonCreateModel,
  SystemUnitRespPersonEditModel,
} from '../types';

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

  /** 關閉 SystemUnitRespPersonCreateModal */
  closeSystemUnitRespPersonCreateModal: () => void;

  /** 處理新增按鈕 Click 事件 */
  handleCreateBtnClick: () => void;

  /** 處理新增 Submit 事件 */
  handleSystemUnitRespPersonCreateFormSubmit: (createModel: SystemUnitRespPersonCreateModel) => Promise<void>;

  /** 關閉 SystemUnitRespPersonEditModal */
  closeSystemUnitRespPersonEditModal: () => void;

  /** 處理編輯按鈕 Click 事件 */
  handleEditBtnClick: (editModel: SystemUnitRespPersonModel) => Promise<void>;

  /** 處理編輯 Submit 事件 */
  handleSystemUnitRespPersonEditFormSubmit: (editModel: SystemUnitRespPersonEditModel) => Promise<void>;

  /** 關閉 SystemUnitRespPersonDeleteModal */
  closeSystemUnitRespPersonDeleteModal: () => void;

  /** 處理刪除按鈕 Click 事件 */
  handleDeleteBtnClick: (data: SystemUnitRespPersonModel) => Promise<void>;

  /** 處理編輯 Submit 事件 */
  handleSystemUnitRespPersonDeleteFormSubmit: (data: SystemUnitRespPersonModel) => Promise<void>;
}

export const PageActionContext = createContext<PageActionContextValue>({} as PageActionContextValue);

export const usePageActionContext = () => {
  return useContext(PageActionContext);
};
