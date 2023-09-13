import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import cx from 'classnames';

export type ModalCloseButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const ModalCloseButton: FC<ModalCloseButtonProps> = (props) => (
  <button {...props} type="button" className={cx('btn-close', props.className || '')} />
);
