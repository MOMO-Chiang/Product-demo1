import { SelectOptionConfig } from '@src/shared/enums';

/** SearchCard Form */
export type SearchCardForm = {
  /** 單位代碼(轄區) */
  unitCode: string;
  /** 單位名稱 */
  unitName: string;
  /** 局承辦人 */
  responsiblePerson: string;
};

/** 局承辦人 */
export type ResponsiblePerson = {
  /** 單位代碼(轄區) */
  unitCode: string;
};

/** 單位承辦人 model */
export interface SystemUnitRespPersonModel {
  /** 流水號 */
  seq: string;
  /** 系統管理員單位名稱 */
  systemPlatformUnitName: string;
  /** 單位代碼(轄區) */
  unitCode: string;
  /** 單位名稱(轄區) */
  unitName: string;
  /** 局承辦人-1  */
  responsiblePerson1: string;
  /** 局承辦人-2  */
  responsiblePerson2: string;
  /** 局承辦人-3 */
  responsiblePerson3: string;
  /** 最後異動人員帳號 */
  updateUserId: string;
  /** 最後異動人員名稱 */
  updateUserName: string;
  /** 最後異動時間 */
  updateTime: string;
}

/** 人員 Create Model */
export interface SystemUnitRespPersonCreateModel {
  /** 身分證字號 */
  idCardNum: string;
  /** 姓名 */
  fullName: string;
  /** 性別 */
  gender: string;
  /** 電話號碼  */
  phoneNumber: string;
  /** 電子郵件 */
  email: string;
}

/** 人員 Edit Model */
export interface SystemUnitRespPersonEditModel {
  /** 流水號 */
  seq: string;
  /** 系統管理員單位名稱 */
  systemPlatformUnitName: string;
  /** 單位代碼(轄區) */
  unitCode: string;
  /** 單位名稱(轄區) */
  unitName: string;
  /** 局承辦人-1  */
  responsiblePerson1: string;
  /** 局承辦人-2  */
  responsiblePerson2: string;
  /** 局承辦人-3 */
  responsiblePerson3: string;
  /** 最後異動人員帳號 */
  updateUserId: string;
  /** 最後異動人員名稱 */
  updateUserName: string;
  /** 最後異動時間 */
  updateTime: string;
}
