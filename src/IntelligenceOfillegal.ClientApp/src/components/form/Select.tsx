import { DetailedHTMLProps, FC, SelectHTMLAttributes, useState } from 'react';
import cx from 'classnames';
import { v4 as UUIDv4 } from 'uuid';

export type SelectOption = {
  /** 下拉選單值 */
  value: string;
  /** 顯示文字 */
  text: string;
};

export type FormSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: SelectOption[];
};

export const Select: FC<FormSelectProps> = ({ id, className, options, onChange, value, ...restProps }) => {
  const [uid] = useState(() => id || UUIDv4());

  return (
    <select {...restProps} className={cx('form-select', className)} onChange={onChange} value={value}>
      {options.map((opt) => (
        <option key={`${uid}_opt_${opt.value}`} value={opt.value}>
          {opt.text}
        </option>
      ))}
    </select>
  );
};
