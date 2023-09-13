import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import './spinner.scss';
import spinnerSVG from './Spinner-1s-120px.svg';

export type SpinnerProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Spinner: FC<SpinnerProps> = (props) => {
  return (
    <div className={`ldio-spinner ${props.className || ''}`}>
      <img src={spinnerSVG} alt="spinner" />
    </div>
  );
};
