import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cx from 'classnames';

export type ModalTitleProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

export const ModalTitle: FC<ModalTitleProps> = (props) => (
  <h5 {...props} className={cx('modal-title', props.className || '')} />
);
