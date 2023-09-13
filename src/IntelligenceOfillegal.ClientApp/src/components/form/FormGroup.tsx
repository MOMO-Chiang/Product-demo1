import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

export type FormGroupProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  inline?: boolean;
};

export const FormGroup: React.FC<FormGroupProps> = (props) => {
  const divProps = _.omit(props, ['inline']);
  const className = cx(
    { 'esapp-form-group': !props.inline, 'esapp-form-group-inline': props.inline },
    props.className || '',
  );
  return <div {...divProps} className={className} />;
};
