import cx from 'classnames';
import './GlobalSpinner.scss';
import { useGlobalSpinner } from './useGlobalSpinner';
import { FC } from 'react';

export interface GlobalSpinnerProps {}

export const GlobalSpinner: FC<GlobalSpinnerProps> = () => {
  const { _spinners } = useGlobalSpinner();

  /** 是否顯示 flag */
  const show = _spinners.length > 0;

  /** 取最後一個 Spinner 來顯示 */
  const spinner = _spinners.length > 0 ? _spinners[_spinners.length - 1] : null;

  return (
    <div className={cx('global-spinner-wrapper', { show })}>
      <div className="global-spinner">
        {spinner && (
          <div className="spinner-content">
            <div className="spinner-graph">
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="spinner-text">{spinner.message || '處理中...'}</div>
          </div>
        )}
      </div>
    </div>
  );
};
