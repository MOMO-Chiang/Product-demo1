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
