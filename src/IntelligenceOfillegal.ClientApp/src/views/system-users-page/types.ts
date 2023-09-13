/** SearchCard Form */
export type SearchCardForm = {
  /** 使用者帳號 */
  userId: string;
  /** 使用者名稱 */
  userName: string;
  /** 單位代碼 */
  unitCode: string;
  /** 單位名稱 */
  unitName: string;
  /** 身分別功能權限 */
  permission: string;
};

/** 使用者資料 */
export interface SystemUsersModel {
  /** 自動序號 */
  seq: number;

  /** 使用者帳號 */
  userId: string;

  /** 使用者名稱 */
  userName: string;

  /** 單位代碼 */
  unitCode: string;

  /** 單位名稱 */
  unitName: string;

  /** 是否有效 */
  isValid: boolean;

  /** 身分別功能權限 */
  permission: string;

  /** 是否為管理員 */
  isAdmin: boolean;

  /** 最後異動人員帳號 */
  updateUserId: string;

  /** 最後異動人員名稱 */
  updateUserName: string;

  /** 最後異動時間 */
  updateTime: string;

  /** 建立時間 */
  createTime: string;
}

/** 使用者資料 編輯 */
export interface SystemUsersEditModel {

  /** 使用者帳號 */
  userId: string;

  /** 使用者名稱 */
  userName: string;

  /** 單位代碼 */
  unitCode: string;

  /** 單位名稱 */
  unitName: string;

  /** 是否有效 */
  isValid: boolean;

  /** 身分別功能權限 */
  permission: string;

  /** 最後異動人員帳號 */
  updateUserId: string;

  /** 最後異動人員名稱 */
  updateUserName: string;

  /** 最後異動時間 */
  updateTime: string;

  /** 建立時間 */
  createTime: string;
}

/** 使用者資料 更正 */
export interface SystemUsersUpdateModel {

  /** 使用者帳號 */
  userId: string;

  /** 是否有效 */
  isValid: boolean;

  /** 最後異動人員帳號 */
  updateUserId: string;

  /** 最後異動人員名稱 */
  updateUserName: string;

  /** 最後異動時間 */
  updateTime: string;
}

 /** 身分別功能權限 下拉選單 */
 export const PERMISSION_OPTION = [
  { text: '承辦人', value: '1' },
  { text: '業管長官', value: '2' },
  { text: '分案人', value: '3' },
  { text: '系統管理者', value: '4' },
];

