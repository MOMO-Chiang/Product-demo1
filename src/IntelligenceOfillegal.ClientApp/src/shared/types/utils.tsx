import { ReactNode } from 'react';

/** 下拉選單 Config */
export type SelectOptionConfig = {
  /** 下拉選單值 */
  value: string;
  /** 顯示文字 */
  text: string;
};

/** Menu 項目 */
export interface MenuItem {
  /** Menu id */
  id: string;
  /** Menu 名稱 */
  title: string;
  /**
   * Menu icon
   * 可用以下兩種方式設定：
   *   1. React 元件: `<i className="fa-solid fa-cube" />`
   *   2. class 字串: `"fa-solid fa-cube"`
   */
  icon?: ReactNode;
  /** 路由 */
  path?: string;
  /** 允許權限 */
  permissions?: string[];
  /** 子 Menu 列表 */
  submenu?: MenuItem[];
}
