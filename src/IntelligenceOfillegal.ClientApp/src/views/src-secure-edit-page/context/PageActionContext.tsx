import { PageChangeHandler, PageSizeSelectChangeHandler, SortChangeHandler } from '@src/components/data-grid';
import { createContext, useContext } from 'react';
import { CaseDistributeEditModel } from '../types';

export interface PageActionContextValue {
  /** 初始頁面資料 */
  initPageData: (id: string | undefined) => Promise<void>;

  /** 處理分案 Submit 事件 */
  handleCaseDistributeFormSubmit: (editModel: CaseDistributeEditModel) => Promise<void>;
}

export const PageActionContext = createContext<PageActionContextValue>({} as PageActionContextValue);

export const usePageActionContext = () => {
  return useContext(PageActionContext);
};
