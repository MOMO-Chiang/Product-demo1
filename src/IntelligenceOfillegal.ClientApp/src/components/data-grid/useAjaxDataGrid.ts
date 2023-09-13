import { useState } from 'react';
import { PaginatedInfoModel, SortedModel } from '@src/shared/types';
import { SortedType } from '@src/shared/enums';

/**
 * useAjaxDataGrid 初始設定物件
 */
export interface UseAjaxDataGridOptions<TGridData> {
  /** Data Grid 資料 的 PK 欄位名稱 */
  pkField: string;

  /** Data Grid 資料 */
  gridData?: TGridData[];

  /** 分頁資料 */
  paginatedInfoModel?: PaginatedInfoModel;

  /** 排序資料 */
  sortedModel?: SortedModel;
}

/**
 * useAjaxDataGrid 回傳物件
 */
export interface UseAjaxDataGridReturn<TGridData, TPK = string | number> {
  /** Data Grid 資料 的 PK 欄位名稱 */
  pkField: string;

  /** Data Grid 資料 */
  gridData: TGridData[];

  /** 分頁資料 */
  paginatedInfoModel: PaginatedInfoModel;

  /** 排序資料 */
  sortedModel: SortedModel;

  /**
   * 設置 GridData
   * @param data Grid 資料
   */
  setGridData: (data: TGridData[]) => void;

  /**
   * 設置排序資料
   * @param model SortedModel
   */
  setSortedModel: (model: SortedModel) => void;

  /**
   * 設置分頁資料
   * @param model PaginatedInfoModel
   */
  setPaginatedInfoModel: (model: PaginatedInfoModel) => void;
}

export const useAjaxDataGrid = <TGridData, TPK>(
  options: UseAjaxDataGridOptions<TGridData>,
): UseAjaxDataGridReturn<TGridData, TPK> => {
  /** Data Grid 資料的 PK 欄位名稱 */
  const [pkField] = useState(options.pkField);

  /** Data Grid 資料 */
  const [gridData, setGridData] = useState<TGridData[]>(options.gridData || []);

  /** 分頁資料 */
  const [paginatedInfoModel, setPaginatedInfoModel] = useState<PaginatedInfoModel>(
    options.paginatedInfoModel || {
      page: 1,
      pageSize: 10,
      pageCount: 0,
      totalCount: 0,
      totalPage: 1,
    },
  );

  /** 排序資料 */
  const [sortedModel, setSortedModel] = useState<SortedModel>(
    options.sortedModel || {
      sortedColumn: '',
      sortedType: SortedType.DESC,
    },
  );

  return {
    pkField,
    gridData,
    paginatedInfoModel,
    sortedModel,
    setGridData,
    setPaginatedInfoModel,
    setSortedModel,
  };
};
