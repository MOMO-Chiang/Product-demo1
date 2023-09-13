import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cx from 'classnames';

export type ModalHeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ModalHeader: FC<ModalHeaderProps> = (props) => (
  <div {...props} className={cx('modal-header', props.className || '')} />
);
