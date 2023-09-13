/** SearchCard Form */
export type SearchCardForm = {
  /** 提報日期(起) */
  setFileStartDate: string;

  /** 提報日期(訖) */
  setFileEndDate: string;
};

/** RptUnitsProcStatus model */
export interface RptUnitsProcStatusModel {
  /** 單位 (代碼) */
  unitCode: string;

  /** 單位 (中文名稱) */
  unitName: string;

  /** 總件數 */
  totalCount: string;

  /** 簽辦中 */
  underSigning: string; // 08

  /** 發交外勤 */
  assignToFieldwork: string; //02

  /** 發查 */
  assignToInvestigation: string; //01

  /** 存查 */
  fileForReference: string; //04

  /** 併案 */
  mergeCase: string; //05

  /** 協查 */
  assistToInvestigation: string; //03
}
