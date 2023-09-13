import { useAdminLayoutContext } from './AdminLayoutContext';
import { SidebarToggler } from './components/SidebarToggler';
import { ThemeToggleButton } from './components/ThemeToggleButton';
import { UserDropdown } from './components/UserDropdown';

export const Header = () => {
  const { toggleDesktopSidebarCollapsed, toggleMobileSidebarOpen } = useAdminLayoutContext();

  return (
    <header className="esapp-admin-layout-header-wrapper">
      <nav className="navbar navbar-expand esapp-admin-layout-header">
        <div className="container-fluid">
          <SidebarToggler variant="mobile" onClick={toggleMobileSidebarOpen} />
          <SidebarToggler variant="desktop" onClick={toggleDesktopSidebarCollapsed} />
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              {/* <ThemeToggleButton /> */}
              <UserDropdown />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
