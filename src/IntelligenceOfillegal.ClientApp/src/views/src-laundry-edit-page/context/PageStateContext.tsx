import { PaginatedInfoModel, SortedModel, SelectOptionConfig } from '@src/shared/types';
import { createContext, useContext } from 'react';
import { ExternalIntelligenceModel, Casefile, SelectOptionList } from '../types';

export interface PageStateContext {
  /** 頁面讀取狀態 */
  isLoading: boolean;

  /** data */
  selectedData: ExternalIntelligenceModel | null;

  /** 檔案列表 */
  fileList: Casefile[] | null;

  /** 下拉選單列表 */
  selectOption: SelectOptionList | null;
}

export const PageStateContext = createContext<PageStateContext>({} as PageStateContext);

export const usePageStateContext = () => {
  return useContext(PageStateContext);
};
