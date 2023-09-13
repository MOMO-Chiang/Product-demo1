import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cx from 'classnames';

export type CardFooterProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const CardFooter: FC<CardFooterProps> = (props) => (
  <div {...props} className={cx('card-footer esapp-card-footer', props.className)} />
);
