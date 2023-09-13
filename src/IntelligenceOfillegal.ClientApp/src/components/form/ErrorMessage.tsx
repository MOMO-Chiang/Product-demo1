import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

export type ErrorMessageProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ErrorMessage: FC<ErrorMessageProps> = (props) => (
  <div {...props} className={`esapp-form-error-message ${props.className || ''}`} />
);
