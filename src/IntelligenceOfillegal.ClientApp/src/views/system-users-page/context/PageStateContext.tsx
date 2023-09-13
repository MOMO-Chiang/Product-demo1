import { PaginatedInfoModel, SortedModel } from '@src/shared/types';
import { createContext, useContext } from 'react';
import { SystemUsersModel, SystemUsersEditModel, SystemUsersUpdateModel } from '../types';

export interface PageStateContext {
  /** 頁面讀取狀態 */
  isLoading: boolean;

  /** 選取的 SystemUsers */
  selectedSystemUsers: SystemUsersModel | null;

  /** Table pkFiled */
  pkField: string;

  /** Table gridData */
  gridData: SystemUsersModel[];

  /** 分頁資料 */
  paginatedInfoModel: PaginatedInfoModel;

  /** 排序資料 */
  sortedModel: SortedModel;

  /** 顯示 SystemUsersEditModal flag */
  isShowSystemUsersEditModal: boolean;

  /** 顯示 SystemUsersUpdateModal flag */
  isShowSystemUsersUpdateModal: boolean;
}

export const PageStateContext = createContext<PageStateContext>({} as PageStateContext);

export const usePageStateContext = () => {
  return useContext(PageStateContext);
};
