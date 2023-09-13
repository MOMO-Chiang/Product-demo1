import { FC } from 'react';
import { Select } from '../form';
import { PageSizeSelectChangeHandler } from './utils';

const DEFAULT_PAGE_SIZE_OPTIONS: number[] = [10, 15, 20, 30];

export type PageSizeSelectProps = {
  /** 分頁控制下拉選單資料 */
  pageSizeList?: number[];
  /** 值 */
  pageSize: number;
  /** 分頁控制下拉選單變更事件 */
  onChange?: PageSizeSelectChangeHandler;

  /** disabled */
  disabled?: boolean;
};

export const PageSizeSelect: FC<PageSizeSelectProps> = ({
  pageSizeList = DEFAULT_PAGE_SIZE_OPTIONS,
  // defaultValue,
  pageSize,
  disabled,
  onChange,
}) => {
  const options = pageSizeList.map((ps) => ({ text: String(ps), value: String(ps) }));

  return (
    <div className="esapp-data-grid-page-size-select__container">
      <span className="esapp-data-grid-page-size-select__text">顯示</span>
      <Select
        className="esapp-data-grid-page-size-select__select"
        options={options}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        value={pageSize}
        disabled={disabled}
      />
      <span className="esapp-data-grid-page-size-select__text">個項目</span>
    </div>
  );
};
