/** 排序類別 */
export enum SortedType {
  /** DESC: 1 */
  DESC = 1,
  /** ASC: -1 */
  ASC = -1,
}

/** 全選的 Checkbox 狀態 */
export enum CheckboxSelectType {
  /** 全選 */
  ALL = 1,
  /** 部分選取 */
  INDETERMINATE = 0,
  /** 未選取 */
  NONE = -1,
}

/** 權限表 */
export enum AdminPermission {
  /** Dashboard */
  dashboard = 'dashboard',
  /** TestCaseList */
  testCaseList = 'testCaseList',

  srcDomestic = 'srcDomestic',
  srcSecure = 'srcSecure',
  srcLaundry = 'srcLaundry',
  /** systemUsers */
  systemUsers = 'systemUsers',
  /** basicCode */
  basicCode = 'basicCode',
  /** RptEconomyIntelligence */
  rptEconomyIntelligence = 'rptEconomyIntelligence',
  /** CaseManagement */
  caseManagement = 'caseManagement',
}

/** 下拉選單 Config */
export type SelectOptionConfig = {
  /** 下拉選單值 */
  value: string;
  /** 顯示文字 */
  text: string;
};
