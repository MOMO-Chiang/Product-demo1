import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import cx from 'classnames';
import _ from 'lodash';

export type FormInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  invalid?: boolean;
};

export const Input: FC<FormInputProps> = (props) => {
  const inputProps = _.omit(props, ['invalid']);
  const className = cx('form-control', props.className || '', {
    'is-invalid': props.invalid,
  });

  return <input {...inputProps} className={className} />;
};
