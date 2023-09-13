import { FC } from 'react';
import cx from 'classnames';

export interface SidebarTogglerProps {
  onClick?: () => void;
  variant: 'mobile' | 'desktop';
}

export const SidebarToggler: FC<SidebarTogglerProps> = ({ onClick, variant }) => (
  <button
    className={cx('sidebar-toggler', {
      'mobile-sidebar-toggler': variant === 'mobile',
      'desktop-sidebar-toggler': variant === 'desktop',
    })}
    type="button"
    aria-label="Toggle sidebar"
    onClick={() => onClick && onClick()}
  >
    <svg
      aria-hidden="true"
      role="img"
      className="sidebar-toggler-svg"
      style={{ height: '24px', width: '24px' }}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  </button>
);
