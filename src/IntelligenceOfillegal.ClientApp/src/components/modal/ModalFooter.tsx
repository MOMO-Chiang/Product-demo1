import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cx from 'classnames';

export type ModalFooterProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ModalFooter: FC<ModalFooterProps> = (props) => (
  <div {...props} className={cx('modal-footer', props.className || '')} />
);
