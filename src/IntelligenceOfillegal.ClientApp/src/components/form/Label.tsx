import { DetailedHTMLProps, FC, LabelHTMLAttributes } from 'react';
import _ from 'lodash';
import cx from 'classnames';

export type FormLabelProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
  isRequred?: boolean;
};

export const Label: FC<FormLabelProps> = (props) => {
  const labelProps = _.omit(props, ['isRequred']);
  const className = cx(
    'form-label esapp-form-label',
    { 'esapp-form-label--required': props.isRequred },
    props.className,
  );

  return <label {...labelProps} className={className} />;
};
