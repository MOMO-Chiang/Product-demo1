import { AdminPermission } from '@src/shared/enums';
import { MenuItem } from '@src/shared/types';
import { RoutePath } from './route-path';

/** Sidebar menu 設定 */
export const SidebarMenuConfig: MenuItem[] = [
  {
    id: 'M01',
    title: '外部情資案件管理',
    icon: 'fa-solid fa-cube',
    submenu: [
      {
        id: 'M01_1',
        title: '國內處',
        path: RoutePath.SRC_DOMESTIC,
        permissions: [AdminPermission.srcDomestic],
      },
      {
        id: 'M01_2',
        title: '保防處',
        path: RoutePath.SRC_SECURE,
        permissions: [AdminPermission.srcSecure],
      },
      {
        id: 'M01_3',
        title: '洗錢防制處',
        path: RoutePath.SRC_LAUNDRY,
        permissions: [AdminPermission.srcLaundry],
      },
    ],
  },
  {
    id: 'M02',
    title: '情資案件管理',
    icon: 'fa-solid fa-cube',
    path: RoutePath.CASE_MANAGEMENT,
    permissions: [AdminPermission.caseManagement],
  },
  {
    id: 'M03',
    title: '統計報表',
    icon: 'fa-solid fa-cube',
    submenu: [
      {
        id: 'M03_1',
        title: '經防處國情處處理報表',
        path: RoutePath.RPT_ECONOMY_INTELLIGENCE,
        permissions: [AdminPermission.rptEconomyIntelligence],
      },
      {
        id: 'M03_2',
        title: '廉政處國情處處理報表',
        path: RoutePath.RPT_INCORRUPTION_INTELLIGENCE,
        permissions: [AdminPermission.rptEconomyIntelligence],
      },
      {
        id: 'M03_3',
        title: '廉政處洗錢處處理報表',
        path: RoutePath.RPT_LAUNDRY_INTELLIGENCE,
        permissions: [AdminPermission.rptEconomyIntelligence],
      },
      {
        id: 'M03_4',
        title: '廉政處提報單位統計表',
        path: RoutePath.RPT_UNITS_PROC_STATUS,
        permissions: [AdminPermission.rptEconomyIntelligence],
      },
      {
        id: 'M03_5',
        title: '專案情資來源件數統計',
        path: RoutePath.RPT_INTELLIGENCE_SOURCE,
        permissions: [AdminPermission.rptEconomyIntelligence],
      },
    ],
  },
  {
    id: 'M04',
    title: '系統管理員',
    icon: 'fa-solid fa-cube',
    submenu: [
      {
        id: 'M04_1',
        title: '使用者帳號管理',
        path: RoutePath.SYSTEM_USERS,
        permissions: [AdminPermission.systemUsers],
      },
      {
        id: 'M04_2',
        title: '單位承辦人頁面',
        path: RoutePath.SYSTEM_UNIT_RESP_PERSON,
        //permissions: [''],
      },
      {
        id: 'M04_3',
        title: '基礎代碼維護',
        path: RoutePath.BASIC_CODE,
        permissions: [AdminPermission.basicCode],
      },
    ],
  },
];
