/** SearchCard Form */
export type SearchCardForm = {
  /** 類別代碼 */
  categoryCode: string;
  /** 類別名稱 */
  category: string;
};

/** 基礎代碼 */
export interface BasicCodeModel {
  /** 流水號 */
  seq: string;

  /** 類別代碼 */
  categoryCode: string;

  /** 顯示名稱代碼 */
  value: string;

  /** 顯示名稱 */
  text: string;

  /** 是否啟用 */
  isActived: boolean;

  /** 資料異動人員五碼 */
  updatePersonId: string;

  /** 資料異動時間 */
  updateTime: string;

  /** 資料建立人員五碼 */
  createPersonId: string;

  /** 資料建立者IP */
  createIP: string;

  /** 資料建立時間 */
  createTime: string;

  /** 類別名稱 */
  category: string;
}

/** 基礎代碼 新增 */
export interface BasicCodeCreateModel {
  /** 流水號 */
  seq: string;

  /** 類別代碼 */
  categoryCode: string;

  /** 顯示名稱代碼 */
  value: string;

  /** 顯示名稱 */
  text: string;

  /** 類別名稱 */
  category: string;
}

/** 基礎代碼 編輯 */
export interface BasicCodeEditModel {

  /** 流水號 */
  seq: string;

  /** 類別代碼 */
  categoryCode: string;

  /** 顯示名稱代碼 */
  value: string;

  /** 顯示名稱 */
  text: string;

  /** 是否啟用 */
  isActived: boolean;

  /** 資料異動人員五碼 */
  updatePersonId: string;

  /** 資料異動時間 */
  updateTime: string;

  /** 資料建立人員五碼 */
  createPersonId: string;

  /** 資料建立者IP */
  createIP: string;

  /** 資料建立時間 */
  createTime: string;

  /** 類別名稱 */
  category: string;
}

/** 基礎代碼 更正 */
export interface BasicCodeUpdateModel {

  /** 流水號 */
  seq: string;

  /** 類別代碼 */
  categoryCode: string;

  /** 顯示名稱代碼 */
  value: string;

  /** 顯示名稱 */
  text: string;

  /** 是否啟用 */
  isActived: boolean;

  /** 資料異動人員五碼 */
  updatePersonId: string;

  /** 資料異動時間 */
  updateTime: string;

  /** 資料建立人員五碼 */
  createPersonId: string;

  /** 資料建立者IP */
  createIP: string;

  /** 資料建立時間 */
  createTime: string;

  /** 類別名稱 */
  category: string;
}

/** SelectOption */
export type SelectOptions = {
  /** 類別代碼categoryCode  */
  text: string;
  /** 類別代碼名稱category */
  value: string;
};

