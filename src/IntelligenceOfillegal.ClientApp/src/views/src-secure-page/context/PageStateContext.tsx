import { PaginatedInfoModel, SortedModel } from '@src/shared/types';
import { createContext, useContext } from 'react';
import { ExternalIntelligenceModel } from '../types';

export interface PageStateContext {
  /** 頁面讀取狀態 */
  isLoading: boolean;

  /** Table pkFiled */
  pkField: string;

  /** Table gridData */
  gridData: ExternalIntelligenceModel[];

  /** 分頁資料 */
  paginatedInfoModel: PaginatedInfoModel;

  /** 排序資料 */
  sortedModel: SortedModel;
}

export const PageStateContext = createContext<PageStateContext>({} as PageStateContext);

export const usePageStateContext = () => {
  return useContext(PageStateContext);
};
