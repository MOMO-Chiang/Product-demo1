import { AnchorHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';
import cx from 'classnames';

export interface NavDropdownProps {
  children?: ReactNode;
  className?: string;
}

export interface NavDropdownToggleProps {
  children?: ReactNode;
  className?: string;
}

export interface NavDropdownMenuProps {
  children?: ReactNode;
  className?: string;
}

export interface NavDropdownLinkProps
  extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  children?: ReactNode;
}

export interface NavDropdownDividerProps {
  className?: string;
}

const NavDropdownToggle: FC<NavDropdownToggleProps> = ({ children, className }) => (
  <a
    className={cx('nav-link dropdown-toggle', className)}
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    {children}
  </a>
);

const NavDropdownMenu: FC<NavDropdownMenuProps> = ({ children, className }) => (
  <div className={cx('dropdown-menu dropdown-menu-end', className)}>{children}</div>
);

const NavDropdownLink: FC<NavDropdownLinkProps> = ({ children, className, ...restProps }) => (
  <a {...restProps} className={cx('dropdown-item', className)}>
    {children}
  </a>
);

const NavDropdownDivider: FC<NavDropdownDividerProps> = ({ className }) => (
  <hr className={cx('dropdown-divider', className)} />
);

export type NavDropdownComponent = FC<NavDropdownProps> & {
  Toggle: typeof NavDropdownToggle;
  Menu: typeof NavDropdownMenu;
  Link: typeof NavDropdownLink;
  Divider: typeof NavDropdownDivider;
};

export const NavDropdown: NavDropdownComponent = ({ children, className }) => (
  <li className={cx('nav-item dropdown', className)}>{children}</li>
);

NavDropdown.Toggle = NavDropdownToggle;
NavDropdown.Menu = NavDropdownMenu;
NavDropdown.Link = NavDropdownLink;
NavDropdown.Divider = NavDropdownDivider;
