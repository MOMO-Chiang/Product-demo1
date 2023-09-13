import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

export type SearchButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const SearchButton: FC<SearchButtonProps> = ({ className, children, ...restProps }) => (
  <button {...restProps} type="submit" className={`btn btn-primary esapp-search-button ${className || ''}`}>
    {children || '搜尋'}
  </button>
);
