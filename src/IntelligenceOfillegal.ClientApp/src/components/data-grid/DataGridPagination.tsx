import { FC } from 'react';
import cx from 'classnames';
import { PaginatedInfoModel } from '@src/shared/types';
import { PageChangeHandler } from './utils';

export interface DataGridPaginationProps {
  /** 分頁資料 */
  paginatedInfoModel: PaginatedInfoModel;

  /**
   * Page 改變事件
   * @param page 新頁碼
   */
  onPageChange?: PageChangeHandler;

  /** Disabled */
  disabled?: boolean;
}

export const DataGridPagination: FC<DataGridPaginationProps> = ({
  paginatedInfoModel,
  onPageChange,
  disabled,
}) => {
  const { page, pageSize, totalCount, totalPage } = paginatedInfoModel;
  const pageFirstItemNum = (page - 1) * pageSize + 1;
  const pageLastItemNum = page * pageSize;

  /** Render 分頁按鈕 */
  const renderPaginationButtons = () => {
    const pages = generatePaginationArray(page, totalPage);
    return pages.map((pageNum) =>
      pageNum === null ? (
        <li key={`pagination_button_${Math.random()}`} className="page-item disabled">
          <a className="page-link">...</a>
        </li>
      ) : (
        <li
          key={`pagination_button_${pageNum}`}
          className={cx('page-item', { active: pageNum === page, disabled })}
        >
          <a className="page-link" onClick={() => onPageChange && pageNum !== page && onPageChange(pageNum)}>
            {pageNum}
          </a>
        </li>
      ),
    );
  };

  return (
    <div className="esapp-pagination">
      <div className="esapp-pagination__info">
        {`顯示第 ${pageFirstItemNum} 到 ${pageLastItemNum} 項, 共 ${totalCount} 項`}
      </div>
      <nav className="esapp-pagination__pagination">
        <ul className="pagination">
          <li className={cx('page-item', { disabled: disabled || page === 1 })}>
            <span className="page-link" onClick={() => onPageChange && onPageChange(page - 1)}>
              上一頁
            </span>
          </li>
          {renderPaginationButtons()}
          <li className={cx('page-item', { disabled: disabled || page === totalPage })}>
            <a className="page-link" onClick={() => onPageChange && onPageChange(page + 1)}>
              下一頁
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

/**
 * 產生分頁頁碼陣列
 * @returns 分頁陣列，若值為 null 表示間隔值。
 */
const generatePaginationArray = (page: number, totalPage: number): Array<number | null> => {
  /**
   * 當前頁數的前後兄弟數的數量
   * @example 若為 1，則顯示: [當前頁數 - 1, 當前頁數, 當前頁數 + 1]
   * @example 若為 2，則顯示: [當前頁數 - 2, 當前頁數 -1, 當前頁數, 當前頁數 + 1, 當前頁數 + 2]
   */
  const siblingCount = 1;
  /** 頁數陣列，儲存所有頁碼，若為 null 表示間隔 */
  const pages = [];
  /** 起始頁 */
  let startPage = page - siblingCount;
  /** 最後頁 */
  let endPage = page + siblingCount;

  if (startPage <= 0) {
    endPage -= startPage - 1;
    startPage = 1;
  }

  if (endPage > totalPage) {
    endPage = totalPage;
  }

  if (startPage > 1) {
    pages.push(1);
    pages.push(null);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPage) {
    pages.push(null);
    pages.push(totalPage);
  }

  return pages;
};
