import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import {
  ColumnDef,
  KeyExtractorHandler,
  RowSelectAllHandler,
  SortChangeHandler,
  RenderRowHandler,
} from './utils';
import { Checkbox } from '../form';
import { SortedType } from '@src/shared/enums';
import { SortedModel } from '@src/shared/types';
import { Spinner } from '../spinner';

export interface DataGridTableProps<TRowData, TPK> {
  /** data 中的 PK 欄位名稱 */
  pkField: string;

  /** 欄位定義 */
  columnDefs: ColumnDef[];

  /** 資料 */
  data: TRowData[];

  /** 排序資料 */
  sortedModel?: SortedModel;

  /** 是否開啟全選 checkbox */
  isSelectAllEnabled?: boolean;

  /** 是否全選 */
  isSelectedAll?: boolean;

  onSortChange?: SortChangeHandler;

  /** 全選事件 */
  onSelectAll?: RowSelectAllHandler;

  renderRow: RenderRowHandler<TRowData>;

  /** Row Key 產生器 (用於設定每個 React 元素中，每個 Row 的 key 值。 ) */
  keyExtractor: KeyExtractorHandler<TRowData>;

  isLoading?: boolean;

  emptyContentMessage?: string | null;
}

/** 延遲顯示 Loading 的毫秒數 */
const DELAY_SHOW_LOADING_MS = 500;

/**
 * `DataGridTable` 元件
 * @property {TRowData} - RowData 的類型
 * @property {TPK} - RowData 的 id 值類型。id field 名稱需用 `props.pkField` 設定。
 */
export function DataGridTable<TRowData, TPK = string | number>({
  columnDefs,
  sortedModel,
  data,
  isLoading,
  emptyContentMessage,
  isSelectAllEnabled,
  isSelectedAll,
  onSortChange,
  onSelectAll,
  renderRow,
  keyExtractor,
}: DataGridTableProps<TRowData, TPK>): JSX.Element {
  const [isShowLoading, setIsShowLoading] = useState(!!isLoading);
  const setTimoutFuncRef = useRef<any | null>(null);

  /**
   * 處理 Loading 顯示邏輯
   * @description 使用 setTimout 延遲顯示 loading cursor，防止畫面抖動。
   */
  useEffect(() => {
    if (isLoading && !isShowLoading) {
      setTimoutFuncRef.current = setTimeout(() => {
        setIsShowLoading(true);
      }, DELAY_SHOW_LOADING_MS);
    }

    if (!isLoading && isShowLoading) {
      setIsShowLoading(false);
    }

    if (!isLoading && !isShowLoading && setTimoutFuncRef.current) {
      clearTimeout(setTimoutFuncRef.current);
      setTimoutFuncRef.current = null;
    }
  }, [isLoading, isShowLoading]);

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {/* 顯示全選 Checkbox */}
            {isSelectAllEnabled && (
              <th className="esapp-data-grid-table-th">
                <Checkbox
                  checked={isSelectedAll}
                  onChange={(e) => onSelectAll && onSelectAll(e.target.checked)}
                  disabled={isLoading}
                />
              </th>
            )}

            {/* Thead 欄位資料 */}
            {columnDefs.map((def) => (
              <th key={def.field} className={cx('esapp-data-grid-table-th', def.className)}>
                <div
                  className={cx('esapp-data-grid-table-th-content', { clickable: def.isSortable })}
                  onClick={() => {
                    if (isLoading) {
                      return;
                    }

                    if (onSortChange && def.isSortable && sortedModel) {
                      let sortedType = SortedType.ASC;

                      // 相同欄位重新排序，且為 'ASC' 就改為 'DESC'
                      if (
                        sortedModel.sortedColumn === def.field &&
                        sortedModel.sortedType === SortedType.ASC
                      ) {
                        sortedType = SortedType.DESC;
                      }
                      onSortChange({ sortedColumn: def.field, sortedType });
                    }
                  }}
                >
                  <div className="esapp-data-grid-table-th-text">{def.text}</div>
                  {def.isSortable && (
                    <div className="esapp-data-grid-table-th-arrows">
                      <i
                        className={cx('fas fa-caret-up', {
                          active:
                            sortedModel &&
                            sortedModel.sortedColumn === def.field &&
                            sortedModel.sortedType === SortedType.ASC,
                        })}
                      />
                      <i
                        className={cx('fas fa-caret-down', {
                          active:
                            sortedModel &&
                            sortedModel.sortedColumn === def.field &&
                            sortedModel.sortedType === SortedType.DESC,
                        })}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        {!isShowLoading && (
          <tbody>
            {data.map((rowData, index) => (
              <tr key={keyExtractor(rowData, index)}>{renderRow(rowData)}</tr>
            ))}
          </tbody>
        )}
      </table>
      {isShowLoading && (
        <div className="esapp-data-table-loading-wrapper">
          <Spinner className="esapp-data-table-loading" />
        </div>
      )}
      {!data && (
        <div className="esapp-data-table-empty-content-wrapper">{emptyContentMessage || '無資料'}</div>
      )}
    </div>
  );
}
