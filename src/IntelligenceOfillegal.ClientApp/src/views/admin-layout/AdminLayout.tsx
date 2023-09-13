import { Outlet } from '@src/libs/router';
import cx from 'classnames';
import './AdminLayout.scss';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { AdminLayoutProvider, useAdminLayoutContext } from './AdminLayoutContext';

export const AdminLayout = () => {
  return (
    <AdminLayoutProvider>
      <AdminLayoutInner />
    </AdminLayoutProvider>
  );
};

const AdminLayoutInner = () => {
  const { isMobileSidebarOpen, isDesktopSidebarCollapsed } = useAdminLayoutContext();

  return (
    <div
      className={cx('esapp-admin-layout', {
        'mobile-sidebar-open': isMobileSidebarOpen,
        'desktop-sidebar-collapsed': isDesktopSidebarCollapsed,
      })}
    >
      <Header />
      <Sidebar />
      <div className="esapp-admin-layout-content">
        <Outlet />
      </div>
    </div>
  );
};
