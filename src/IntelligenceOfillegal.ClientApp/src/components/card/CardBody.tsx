import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cx from 'classnames';

export type CardBodyProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const CardBody: FC<CardBodyProps> = (props) => (
  <div {...props} className={cx('card-body esapp-body', props.className)} />
);
