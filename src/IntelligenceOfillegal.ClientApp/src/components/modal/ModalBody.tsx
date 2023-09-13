import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cx from 'classnames';

export type ModalBodyProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ModalBody: FC<ModalBodyProps> = (props) => (
  <div {...props} className={cx('modal-body', props.className || '')} />
);
