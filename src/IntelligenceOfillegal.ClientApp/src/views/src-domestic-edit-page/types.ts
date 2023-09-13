import { SelectOptionConfig } from '@src/shared/types';

/** Card Form */
export type CardForm = ExternalIntelligenceModel;
/** SearchCard Form */
export type SearchCardForm = {
  /** 情資編號 */
  intelligenceNo: string;
  /** 承辦人姓名(原始來源可能沒有) */
  supervisorName: string;
  /** 國情文號(原單位檔案編號) */
  fileNo: string;
  /** 案號 */
  caseNo: string;
  /** 案名 */
  caseName: string;
};
/** model */
export interface ExternalIntelligenceModel {
  /**  */
  seq: string;
  /** 情資編號 */
  intelligenceNo: string;
  /** 承辦人五碼 */
  supervisor: string;
  /** 承辦人姓名(原始來源可能沒有) */
  supervisorName: string;
  /** 國情文號(原單位檔案編號) */
  fileNo: string;
  /** 案號 */
  caseNo: string;
  /** 案名 */
  caseName: string;
  /** 建檔日期(可能是111/11/15) */
  createFileDate: string;
  /** 案情摘要 */
  caseAbstract: string;
  /** 提報單位(該局處下的單位) */
  reportUnitCode: string;
  /** 轉報人五碼 */
  transReportPersonId: string;
  /** 原報代號(承辦人五碼???) */
  reportNumber: string;
  /** 來源字號 */
  srcNumber: string;
  /** 資料建立日期 */
  createTime: string;
}
/** 分案 */
export type CaseDistributeModel = {
  /** 分案單位(25:經防處   31:廉政處) 由分案人所屬單位決定 */
  caseDistributeUnit: string;
  /** 分案類別( 0:無 ,1:廉能  ,2:非廉能 ) 無給經防用 */
  caseCategory: string;
  /** 對象類別代碼 */
  objectCategory: string;
  /** 承辦人單位代碼(科) */
  supervisorDepartment: string;
  /** 承辦人人事五碼 */
  supervisorId: string;
  /** 主要對象序號(對應到 ObjPerson 資料表) */
  objPersonId: string;
  /** 主要對象身分證號 */
  mainSuspectId: string;
  /** 主要對象姓名 */
  mainSuspectName: string;
};

/** 加入分案 */
export type CaseDistributeEditModel = {
  ExternalIntelligence: ExternalIntelligenceModel;
  CaseDistribute: CaseDistributeModel;
};
/** filelist */
export type Casefile = {
  /** 對應到view 表的 seq */
  seq: string;
  /** 檔案名稱 */
  fileName: string;
  /** 檔案完整路徑 */
  filePath: string;
};

/** 下拉選單列表 */
export type SelectOptionList = {
  /** 分案類別 */
  caseCategory: SelectOptionConfig[];
  /** 對象清單 */
  suspects: SelectOptionConfig[];
  /** 對象類別 */
  objType: SelectOptionConfig[];
  notObjType: SelectOptionConfig[];

  supervisorDepartment: SelectOptionConfig[];
  // supervisorDepartmentName: SelectOptionConfig[];
};
