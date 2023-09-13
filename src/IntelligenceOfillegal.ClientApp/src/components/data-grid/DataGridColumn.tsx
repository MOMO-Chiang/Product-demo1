import { DetailedHTMLProps, FC, ReactNode, TdHTMLAttributes } from 'react';
import cx from 'classnames';

export interface DataGridColumnProps
  extends DetailedHTMLProps<TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
  children: ReactNode;
}

export const DataGridColumn: FC<DataGridColumnProps> = ({ children, className, ...restProps }) => (
  <td {...restProps} className={cx('esapp-data-grid-td', className)}>
    {children}
  </td>
);
