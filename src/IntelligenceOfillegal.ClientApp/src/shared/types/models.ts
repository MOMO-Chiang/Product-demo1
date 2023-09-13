import { AdminPermission, SortedType } from '../enums';

/** 分頁資料 */
export interface PaginatedInfoModel {
  /** 當前頁數 */
  page: number;
  /** 分頁大小 */
  pageSize: number;
  /** 總頁數 */
  totalPage: number;
  /** 當頁資料筆數 */
  pageCount: number;
  /** 總資料筆數 */
  totalCount: number;
}

/** 排序模型 */
export interface SortedModel {
  /** 排序欄位名稱 */
  sortedColumn: string;
  /** 排序類型 */
  sortedType: SortedType;
}

/** API 分頁資料 Response */
export interface APIPaginatedResponse<T> {
  /** 分頁資訊 */
  paginatedInfo: PaginatedInfoModel;
  /** 資料 */
  data: T;
}

/** API 分頁查詢資料 */
export type APIPaginatedQueryParams = {
  page: number;
  pageSize: number;
  sortedColumn: string;
  sortedType: SortedType;
  isAll?: boolean;
};

/** 登入使用者資訊 */
export interface AuthLoginUserInfo {
  /** user id */
  uid: string;
  /** username */
  username: string;
}

/** 登入資訊 */
export interface AuthLoginInfo {
  /** Token */
  token: string;
  /** 到期時間戳 */
  expires: number;
  /** 登入使用者資訊 */
  userInfo: AuthLoginUserInfo;
  /** 權限資料 */
  permissions: AdminPermissionMap;
}

export type AdminPermissionMap<P = typeof AdminPermission> = {
  [K in keyof P]: boolean;
};

// ============ API Models ================
