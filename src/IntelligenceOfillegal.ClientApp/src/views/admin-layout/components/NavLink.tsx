import { FC, ReactNode } from 'react';

export interface NavItemProps {
  children?: ReactNode;
}

export const NavLink: FC<NavItemProps> = ({ children }) => (
  <li className="nav-item">
    <a className="nav-link">{children}</a>
  </li>
);
