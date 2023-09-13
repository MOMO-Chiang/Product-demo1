import { PaginatedInfoModel, SortedModel } from '@src/shared/types';
import { createContext, useContext } from 'react';
import { RptIntelligenceSourceModel } from '../types';
import { SelectOption } from '@src/components/form';

export interface PageStateContext {
  /** 頁面讀取狀態 */
  isLoading: boolean;

  /** Table pkFiled */
  pkField: string;

  /** Table gridData */
  gridData: RptIntelligenceSourceModel[];

  /** 分頁資料 */
  paginatedInfoModel: PaginatedInfoModel;

  /** 排序資料 */
  sortedModel: SortedModel;

  /** 案件類別 */
  caseTypeOptions: SelectOption[];
}

export const PageStateContext = createContext<PageStateContext>({} as PageStateContext);

export const usePageStateContext = () => {
  return useContext(PageStateContext);
};
