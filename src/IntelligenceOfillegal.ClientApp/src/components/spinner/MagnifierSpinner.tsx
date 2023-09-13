import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import './magnifier-spinner.scss';
import magnifierSVG from './Magnify-1s-80px.svg';

export type MagnifierSpinnerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * 放大鏡 Spinner 元件
 * @returns MagnifierSpinner
 */
export const MagnifierSpinner: FC<MagnifierSpinnerProps> = (props) => (
  <div className={`ldio-magnifier-spinner ${props.className || ''}`}>
    <img src={magnifierSVG} />
  </div>
);
