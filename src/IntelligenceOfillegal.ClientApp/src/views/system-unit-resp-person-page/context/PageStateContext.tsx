import { PaginatedInfoModel, SelectOptionConfig, SortedModel } from '@src/shared/types';
import { createContext, useContext } from 'react';
import { SystemUnitRespPersonModel } from '../types';

export interface PageStateContext {
  /** 頁面讀取狀態 */
  isLoading: boolean;

  /** 選取的 SystemUnitRespPerson */
  selectedSystemUnitRespPerson: SystemUnitRespPersonModel | null;

  /** 承辦人下拉選項 */
  responsiblePersonOptions: SelectOptionConfig[];

  /** Table pkFiled */
  pkField: string;

  /** Table gridData */
  gridData: SystemUnitRespPersonModel[];

  /** 分頁資料 */
  paginatedInfoModel: PaginatedInfoModel;

  /** 排序資料 */
  sortedModel: SortedModel;

  /** 顯示 SystemUnitRespPersonCreateModal flag */
  isShowSystemUnitRespPersonCreateModal: boolean;

  /** 顯示 SystemUnitRespPersonEditModal flag */
  isShowSystemUnitRespPersonEditModal: boolean;

  /** 顯示 SystemUnitRespPersonDeleteModal flag */
  isShowSystemUnitRespPersonDeleteModal: boolean;
}

export const PageStateContext = createContext<PageStateContext>({} as PageStateContext);

export const usePageStateContext = () => {
  return useContext(PageStateContext);
};
