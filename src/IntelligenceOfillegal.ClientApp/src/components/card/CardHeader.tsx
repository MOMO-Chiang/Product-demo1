import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cx from 'classnames';

export type CardHeaderProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const CardHeader: FC<CardHeaderProps> = (props) => (
  <div {...props} className={cx('card-header esapp-card-header', props.className)} />
);
