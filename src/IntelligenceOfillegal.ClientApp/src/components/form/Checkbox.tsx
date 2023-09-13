import { ReactNode, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import cx from 'classnames';

type HTMLCheckboxElement = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
>;

export type FormCheckboxProps = HTMLCheckboxElement & {
  children?: ReactNode;
  isInvalid?: boolean;
  isRequred?: boolean;
  /** 是否選取 */
  checked?: boolean;

  /** 是否為部分選取狀態 */
  indeterminate?: boolean;
};

export const Checkbox: FC<FormCheckboxProps> = ({
  id,
  children,
  className,
  checked,
  isRequred,
  indeterminate,
  isInvalid,
  onChange,
  ...restInputProps
}) => {
  return (
    <div className={cx('form-check', className)}>
      <input
        {...restInputProps}
        id={id}
        type="checkbox"
        className={cx('form-check-input', { indeterminate, 'is-invalid': isInvalid })}
        checked={checked}
        onChange={onChange}
      />
      <label className={cx('form-check-label', { 'app-form-label--required': isRequred })} htmlFor={id}>
        {children}
      </label>
    </div>
  );
};
