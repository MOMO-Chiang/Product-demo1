import { PageChangeHandler, PageSizeSelectChangeHandler, SortChangeHandler } from '@src/components/data-grid';
import { createContext, useContext } from 'react';
import { SearchCardForm, RptEconomyIntelligenceModel } from '../types';

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

  /** 匯出 Excel */
  handleExportExcel: () => Promise<void>;
}

export const PageActionContext = createContext<PageActionContextValue>({} as PageActionContextValue);

export const usePageActionContext = () => {
  return useContext(PageActionContext);
};
