import { SortedModel } from '@src/shared/types';
import { ReactNode } from 'react';

export interface ColumnDef {
  /** 資料物件 [key] 名稱 */
  field: string;

  /** 欄位顯示文字 */
  text: string;

  /**
   * 是否隱藏
   * @default - false
   */
  isHidden?: boolean;

  /**
   * 是否可排序
   * @default - true
   */
  isSortable?: boolean;

  /** className */
  className?: string;
}

export type RowKeyExtractorHandler<T = unknown> = (rowData: T, index: number) => string;

export type PageChangeHandler = (page: number) => void;

export type KeyExtractorHandler<T> = (item: T, index: number) => string;

export type RenderRowHandler<T> = (rowData: T) => ReactNode;

export type RowSelectAllHandler = (isSelectedAll: boolean) => void;

export type SortChangeHandler = (sortedModel: SortedModel) => void;

export interface PageSizeSelectChangeHandler {
  (pageSize: number): void;
}
