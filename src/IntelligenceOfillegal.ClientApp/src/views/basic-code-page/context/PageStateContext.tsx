import { PaginatedInfoModel, SortedModel } from '@src/shared/types';
import { createContext, useContext } from 'react';
import { BasicCodeModel, BasicCodeEditModel, BasicCodeUpdateModel, SelectOptions } from '../types';
import { SelectOption } from '@src/components/form';

export interface PageStateContext {
  /** 頁面讀取狀態 */
  isLoading: boolean;

  /** 選取的 BasicCode */
  selectedBasicCode: BasicCodeModel | null;

  /** Table pkFiled */
  pkField: string;

  /** Table gridData */
  gridData: BasicCodeModel[];

  /** 分頁資料 */
  paginatedInfoModel: PaginatedInfoModel;

  /** 排序資料 */
  sortedModel: SortedModel;

  /** 顯示 BasicCodeCreateModal flag */
  isShowBasicCodeCreateModal: boolean;

  /** 顯示 BasicCodeEditModal flag */
  isShowBasicCodeEditModal: boolean;

  /** 顯示 BasicCodeUpdateModal flag */
  isShowBasicCodeUpdateModal: boolean;

  /** 類別項目清單 */
  categoryCodeSelectOptions: SelectOption[];
}

export const PageStateContext = createContext<PageStateContext>({} as PageStateContext);

export const usePageStateContext = () => {
  return useContext(PageStateContext);
};
