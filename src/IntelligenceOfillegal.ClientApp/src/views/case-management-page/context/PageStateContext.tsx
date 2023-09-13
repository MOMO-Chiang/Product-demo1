import { PaginatedInfoModel, SelectOptionConfig, SortedModel } from '@src/shared/types';
import { createContext, useContext } from 'react';
import { CaseManagementModel } from '../types';

export interface PageStateContext {
  /** 頁面讀取狀態 */
  isLoading: boolean;

  /** Table pkFiled */
  pkField: string;

  /** Table gridData */
  gridData: CaseManagementModel[];

  /** 分頁資料 */
  paginatedInfoModel: PaginatedInfoModel;

  /** 排序資料 */
  sortedModel: SortedModel;

  /** 下拉選單資料 */
  caseCategorySelectOptions: SelectOptionConfig[];
  investigateProgressSelectOptions: SelectOptionConfig[];
}

export const PageStateContext = createContext<PageStateContext>({} as PageStateContext);

export const usePageStateContext = () => {
  return useContext(PageStateContext);
};
