/** SearchCard Form */
export type SearchCardForm = {
  /** 建檔日期(起)(原收文日期) */
  setFileStartDate: string;

  /** 建檔日期(迄)(原收文日期) */
  setFileEndDate: string;

  /** 來文單位 (中文名稱) */
  itlgSrcReportUnitName: string;
};

/** RptEconomyIntelligence model */
export interface RptEconomyIntelligenceModel {
  /** 一處文號 */
  itlgSrcFileNo: string;

  /** 收文日期 */
  itlgSrcCreateFileDate: string;

  /** 新流水號 */
  intelligenceNo: string;

  /** 主旨 */
  itlgSrcCaseName: string;

  /** 主承辦人 */
  itlgSrcSupervisorId: string;

  /** 業務承辦人 */
  supervisorId: string;

  /** 案件狀態 */
  investigateProgressName: string;

  /** 公文號 */
  receiveReportNum: string;

  /** 來文單位 (中文名稱) */
  itlgSrcReportUnitName: string;

  /** 外勤單位 (中文名稱) */
  caseDistributeUnitName: string;
}
