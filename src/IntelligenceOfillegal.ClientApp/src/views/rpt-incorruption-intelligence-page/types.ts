/** SearchCard Form */
export type SearchCardForm = {
  /** 提報日期(起) */
  setFileStartDate: string;

  /** 提報日期(訖) */
  setFileEndDate: string;

  /** 提報單位 */
  itlgSrcReportUnitName: string;
};

/** RptEconomyIntelligence model */
export interface RptIncorruptionIntelligenceModel {
  /** 項次 */
  seq: string;

  /** 來源單位 */
  itlgSrcUnitName: string;

  /** 新流水號 */
  intelligenceNo: string;

  /** 分送日期 */
  itlgSrcCreateFileDate: string;

  /** 來源字號 */
  itlgSrcFileNo: string;

  /** 案件類別 */
  mainCaseTypeName: string;

  /** 選舉情資註記 */
  electionItlgNotes: string;

  /** 承辦人 */
  itlgSrcSupervisorId: string;

  /** 提報單位 */
  itlgSrcReportUnitName: string;

  /** 提報日期 */
  createTime: string;

  /** 公文字號 */
  receiveReportNum: string;

  /** 內容摘要 */
  itlgSrcCaseName: string;

  /** 處理情形 */
  investigateProgressName: string;

  /** 承辦科 */
  supervisorDepartmentName: string;
}
