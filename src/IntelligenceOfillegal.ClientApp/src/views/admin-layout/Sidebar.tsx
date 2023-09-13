import { FC } from 'react';
import * as _ from 'lodash';
import { useAdminLayoutContext } from './AdminLayoutContext';
import { AppBrand } from './components/AppBrand';
import { SidebarMenuContainer } from './components/SidebarMenuContainer';
import { SidebarMenuConfig } from '@src/app';
import { useAuth } from '@src/modules/auth';
import { MenuItem } from '@src/shared/types';

export interface SidebarProps {}

export const Sidebar: FC<SidebarProps> = () => {
  const { toggleMobileSidebarOpen } = useAdminLayoutContext();
  const menuItems = usePermissionMenuItems();

  return (
    <>
      <aside className="esapp-admin-layout-sidebar">
        <div className="sidebar-container">
          <div className="sidebar-header">
            <AppBrand />
          </div>
          <div className="sidebar-content">
            <SidebarMenuContainer items={menuItems} />
          </div>
        </div>
      </aside>
      <div className="esapp-admin-layout-sidebar-overlay" onClick={toggleMobileSidebarOpen}></div>
    </>
  );
};

function usePermissionMenuItems() {
  const { userPermissions } = useAuth();
  const filteredMenuConfig = [] as MenuItem[];

  // TODO: 篩選有權限的選單
  for (let i = 0; i < SidebarMenuConfig.length; i++) {
    const menuItem = _.cloneDeep(SidebarMenuConfig[i]);

    if (menuItem.submenu && menuItem.submenu.length > 0) {
      // 有 submenu 的情況
      menuItem.submenu = menuItem.submenu.filter((subMenuItem) => {
        if (subMenuItem.permissions && subMenuItem.permissions.length > 0) {
          return subMenuItem.permissions.some((permission) => userPermissions.includes(permission));
        }

        return true;
      });

      if (menuItem.submenu.length > 0) {
        filteredMenuConfig.push(menuItem);
      }
    } else {
      // 無 submenu 的情況
      if (menuItem.permissions && menuItem.permissions.length > 0) {
        const hasPermission = menuItem.permissions?.some((permission) =>
          userPermissions.includes(permission),
        );

        if (hasPermission) {
          filteredMenuConfig.push(menuItem);
        }
      } else {
        filteredMenuConfig.push(menuItem);
      }
    }
  }

  return filteredMenuConfig;
}
