import { FC, ReactNode, useEffect, useState } from 'react';
import cx from 'classnames';
import { MenuItem } from '@src/shared/types';
import { Link, useLocation } from '@src/libs/router';

/** 有狀態的 Menu 項目 */
interface StatusfulMenuItem extends MenuItem {
  /** 展開狀態 */
  expanded?: boolean;
  /** active 狀態 */
  active?: boolean;
}

/** SidebarMenuContainer 元件 Props */
export interface SidebarMenuContainerProps {
  /** Menu 列表 */
  items?: MenuItem[];
}

/** SidebarMenu 元件 Props */
interface SidebarMenuProps {
  /** 有狀態的 Menu 列表 */
  items?: StatusfulMenuItem[];
  /** 是否為 submenu */
  isSubmenu?: boolean;
  /**
   * Menu onClick 事件
   * @param item 當前點擊的 Menu
   */
  onMenuClick?: (item: StatusfulMenuItem) => void;
}

/** MenuItemComponentProps 元件 Props */
interface MenuItemComponentProps {
  /** 有狀態的 Menu 資料 */
  item: StatusfulMenuItem;
  /** 是否展開 */
  expanded?: boolean;
  /** 是否 active */
  active?: boolean;
  /**
   * Menu onClick 事件
   * @param item 當前點擊的 Menu
   */
  onMenuClick?: (item: StatusfulMenuItem) => void;
}

/**
 * MenuLink 元件 Props
 */
interface MenuLinkProps {
  /** 路由 */
  path?: string;
  /** class */
  className?: string;
  /** 內容元素 */
  children?: ReactNode;
  /** onClick 事件 */
  onClick: () => void;
}

/**
 * SidebarMenuContainer 元件
 * @param props SidebarMenuContainerProps
 */
export const SidebarMenuContainer: FC<SidebarMenuContainerProps> = ({ items }) => {
  const location = useLocation();

  // 當前展開的 menu ids
  const [expandedMenuIds, setExpandedMenuIds] = useState<string[]>([]);
  // 當前 active 狀態的 menu ids
  const [acitveMenuIds, setActiveMenuIds] = useState<string[]>([]);

  /**
   * 處理 Menu onClick 事件
   * @param item 當前點擊的 Menu
   */
  const handleMenuClick = (item: StatusfulMenuItem) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    // 處理 expanded 狀態
    if (hasSubmenu) {
      if (expandedMenuIds.includes(item.id)) {
        setExpandedMenuIds(expandedMenuIds.filter((id) => id !== item.id));
      } else {
        setExpandedMenuIds(expandedMenuIds.concat(item.id));
      }
    }

    // 處理 active 狀態
    if (item.path && acitveMenuIds.includes(item.id)) {
      setActiveMenuIds([item.id]);
    }
  };

  /** 含狀態的 Menu 列表 */
  const statusfulItems = bindMenuItemsStatus(items, expandedMenuIds, acitveMenuIds);

  useEffect(() => {
    const menu = findMenuByPath(items, location.pathname);

    if (menu) {
      setActiveMenuIds([menu?.id]);
    }
  }, [location]);

  return <SidebarMenu items={statusfulItems} onMenuClick={handleMenuClick} />;
};

/**
 * SidebarMenu 元件
 * @param props SidebarMenuProps
 */
const SidebarMenu: FC<SidebarMenuProps> = ({ items, isSubmenu, onMenuClick }) => {
  return (
    <ul className={cx('sidebar-menu', { submenu: isSubmenu })}>
      {items &&
        items.map((item) => (
          <MenuItemComponent
            key={item.id}
            item={item}
            expanded={item.expanded}
            active={item.active}
            onMenuClick={onMenuClick}
          />
        ))}
    </ul>
  );
};

/**
 * MenuItemComponent 元件
 * @param props MenuItemComponentProps
 */
const MenuItemComponent: FC<MenuItemComponentProps> = ({ item, active, expanded, onMenuClick }) => {
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const expandedClass = expanded ? 'expanded' : '';
  const activeClass = active ? 'active' : '';

  return (
    <li className={cx('menu-item', expandedClass, activeClass)}>
      <MenuLink className="menu-link" path={item.path} onClick={() => onMenuClick && onMenuClick(item)}>
        {/* Menu icon */}
        <span className="menu-icon">
          {typeof item.icon === 'string' ? <i className={item.icon} /> : item.icon}
        </span>

        {/* Title */}
        <span className="menu-title">{item.title}</span>

        {/* 箭頭 icon */}
        {hasSubmenu && (
          <span className="menu-arrow">
            <i className="fa-solid fa-caret-right"></i>
          </span>
        )}
      </MenuLink>
      {hasSubmenu && <SidebarMenu items={item.submenu} isSubmenu={hasSubmenu} onMenuClick={onMenuClick} />}
    </li>
  );
};

/**
 * MenuLink 元件
 * @param props MenuLinkProps
 */
const MenuLink: FC<MenuLinkProps> = ({ path, className, children, onClick }) => {
  if (path) {
    return (
      <Link to={path} className={className} onClick={onClick}>
        <>{children}</>
      </Link>
    );
  }

  return (
    <a className={className} onClick={onClick}>
      {children}
    </a>
  );
};

/**
 * 綁定 Menu 列表狀態
 * @param items Menu 列表
 * @param expandedIds 展開狀態的 menu ids
 * @param activeIds active 狀態的 menu ids
 * @returns `StatusfulMenuItem[]` 有狀態的 Menu 列表
 */
function bindMenuItemsStatus(
  items: MenuItem[] = [],
  expandedIds: string[],
  activeIds: string[],
): StatusfulMenuItem[] {
  return items.map((item) => ({
    ...item,
    expanded: expandedIds.includes(item.id),
    active: activeIds.includes(item.id),
    submenu: item.submenu ? bindMenuItemsStatus(item.submenu, expandedIds, activeIds) : [],
  }));
}

/**
 * 取得指定路由的 Menu
 * @param items Menu 列表
 * @param path 指定路由
 * @returns `MenuItem | null` - 回傳找到的 `MenuItem`，若找不到則為 `null`。
 */
function findMenuByPath(items?: MenuItem[], path?: string): MenuItem | null {
  if (!items) {
    return null;
  }

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.path === path) {
      return item;
    }

    if (item.submenu && item.submenu.length > 0) {
      const submenuItem = findMenuByPath(item.submenu, path);

      if (submenuItem) {
        return submenuItem;
      }
    }
  }

  return null;
}
