import { PageChangeHandler, PageSizeSelectChangeHandler, SortChangeHandler } from '@src/components/data-grid';
import { createContext, useContext } from 'react';
import { SearchCardForm, BasicCodeCreateModel, BasicCodeEditModel, BasicCodeModel } from '../types';

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

  /** 關閉 BasicCodeCreateModal */
  closeBasicCodeCreateModal: () => void;

  /** 處理新增按鈕 Click 事件 */
  handleBasicCodeCreateBtnClick: () => void;

  /** 處理新增 Submit 事件 */
  handleBasicCodeCreateFormSubmit: (createModel: BasicCodeCreateModel) => Promise<void>;

  /** 處理直接修改帳號是否啟用事件 */
  handleActivedChange: (data: BasicCodeModel) => void;

  /** 關閉 BasicCodeEditModal */
  closeBasicCodeEditModal: () => void;

  /** 處理編輯按鈕 Click 事件 */
  handleBasicCodeEditBtnClick: (data: BasicCodeModel) => Promise<void>;

  /** 處理編輯 Submit 事件 */
  handleBasicCodeEditFormSubmit: (editModel: BasicCodeEditModel) => Promise<void>;
}

export const PageActionContext = createContext<PageActionContextValue>({} as PageActionContextValue);

export const usePageActionContext = () => {
  return useContext(PageActionContext);
};
