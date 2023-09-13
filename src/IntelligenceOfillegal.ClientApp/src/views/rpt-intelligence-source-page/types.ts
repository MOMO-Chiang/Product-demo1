/** SearchCard Form */
export type SearchCardForm = {
  /** 提報日期(起) */
  setFileStartDate: string;

  /** 提報日期(訖) */
  setFileEndDate: string;

  /** 案件類別 */
  caseType: string;
};

/** RptIntelligenceSource model */
export interface RptIntelligenceSourceModel {
  /** 單位 (代碼) */
  unitCode: string;

  /** 單位 (中文名稱) */
  unitName: string;

  /** 件數 */
  totalCount: string;
}
