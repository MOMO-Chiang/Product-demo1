import { useState } from 'react';
import * as _ from 'lodash';
import { PaginatedInfoModel, SortedModel } from '@src/shared/types';
import { SortedType } from '@src/shared/enums';
import { PageChangeHandler, SortChangeHandler, PageSizeSelectChangeHandler } from './utils';

/**
 * useDataGrid 初始設定物件
 */
export interface UseDataGridOptions<TGridData> {
  /** Data Grid 資料 的 PK 欄位名稱 */
  pkField: string;

  /** Data Grid 資料 */
  gridData?: TGridData[];

  /** Data Grid 資料 */
  test?: TGridData[];

  /** 分頁資料 */
  paginatedInfoModel?: PaginatedInfoModel;

  /** 排序資料 */
  sortedModel?: SortedModel;

  /** 處理換頁事件 */
  handlePageChange?: PageChangeHandler;

  /** 處理排序變更事件 */
  handleSortChange?: SortChangeHandler;

  /** 處理分頁大小變更事件 */
  handlePageSizeChange?: PageSizeSelectChangeHandler;
}

/**
 * useDataGrid 回傳物件
 */
export interface UseDataGridReturn<TGridData, TPK = string | number> {
  /** Data Grid 資料 的 PK 欄位名稱 */
  pkField: string;

  /** Data Grid 資料 */
  gridData: TGridData[];

  /** 當前分頁 Data Grid 資料 */
  paginatedGridData: TGridData[];

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

  /** 處理換頁事件 */
  handlePageChange: PageChangeHandler;

  /** 處理排序變更事件 */
  handleSortChange: SortChangeHandler;

  /** 處理分頁大小變更事件 */
  handlePageSizeChange: PageSizeSelectChangeHandler;

  /** 處理搜尋事件 */
  handleFilter: (fn: (data: TGridData[]) => TGridData[]) => void;
}

export const useDataGrid = <TGridData, TPK>(
  options: UseDataGridOptions<TGridData>,
): UseDataGridReturn<TGridData, TPK> => {
  /** Data Grid 資料的 PK 欄位名稱 */
  const [pkField] = useState(options.pkField);

  /** Data Grid 資料 */
  const [gridData, setGridData] = useState<TGridData[]>(options.gridData || []);

  /** Filtered Data Grid 資料 */
  const [filteredGridData, setFilteredGridData] = useState<TGridData[]>(options.gridData || []);

  /** 分頁資料 */
  const [paginatedInfoModel, setPaginatedInfoModel] = useState<PaginatedInfoModel>(
    options.paginatedInfoModel || initPaginatedInfoModel(filteredGridData),
  );

  /** 排序資料 */
  const [sortedModel, setSortedModel] = useState<SortedModel>(
    options.sortedModel || {
      sortedColumn: '',
      sortedType: SortedType.DESC,
    },
  );

  const [paginatedGridData, setPaginatedGridData] = useState<TGridData[]>(
    changePaginatedGridData(filteredGridData, paginatedInfoModel),
  );

  const handlePageChange: PageChangeHandler = (page) => {
    const newpaginatedInfoModel = {
      ...paginatedInfoModel,
      page: page,
    };
    setPaginatedInfoModel(newpaginatedInfoModel);
    setPaginatedGridData(changePaginatedGridData(filteredGridData, newpaginatedInfoModel));
  };

  const handleSortChange: SortChangeHandler = (sortedModel) => {
    const sortedData = _.orderBy(
      filteredGridData,
      sortedModel.sortedColumn,
      sortedModel.sortedType === SortedType.DESC ? 'desc' : 'asc',
    );
    setFilteredGridData(sortedData);
    setSortedModel(sortedModel);
    setPaginatedGridData(changePaginatedGridData(sortedData, paginatedInfoModel));
  };

  const handlePageSizeChange: PageSizeSelectChangeHandler = (pageSize) => {
    const newpaginatedInfoModel = {
      ...paginatedInfoModel,
      pageSize: pageSize,
      totalPage: Math.ceil(filteredGridData.length / pageSize),
    };
    setPaginatedInfoModel(newpaginatedInfoModel);
    setPaginatedGridData(changePaginatedGridData(filteredGridData, newpaginatedInfoModel));
  };

  const handleGridDataChange = (data: TGridData[]) => {
    setGridData(data);
    setFilteredGridData(data);
    setPaginatedInfoModel(initPaginatedInfoModel(data));
    setPaginatedGridData(changePaginatedGridData(data, paginatedInfoModel));
  };

  const handleFilter = (fn: (data: TGridData[]) => TGridData[]) => {
    const filteredGridData = fn(gridData);
    const filteredPaginatedModel = initPaginatedInfoModel(filteredGridData);
    setFilteredGridData(filteredGridData);
    setPaginatedInfoModel(filteredPaginatedModel);
    setPaginatedGridData(changePaginatedGridData(filteredGridData, filteredPaginatedModel));
  };

  return {
    pkField,
    gridData,
    paginatedGridData,
    paginatedInfoModel,
    sortedModel,
    setGridData: handleGridDataChange,
    setPaginatedInfoModel,
    setSortedModel,
    handlePageChange,
    handleSortChange,
    handlePageSizeChange,
    handleFilter,
  };
};

function changePaginatedGridData<T>(gridData: T[], paginatedInfoModel: PaginatedInfoModel) {
  const perPage = paginatedInfoModel.pageSize;
  const startIndex = (paginatedInfoModel.page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return gridData.slice(startIndex, endIndex);
}

function initPaginatedInfoModel<T>(gridData: T[]) {
  const initPaginatedInfoModel: PaginatedInfoModel = {
    page: 1,
    pageSize: 10,
    pageCount: Math.ceil(gridData.length / 10),
    totalCount: gridData.length,
    totalPage: Math.ceil(gridData.length / 10),
  };
  return initPaginatedInfoModel;
}
