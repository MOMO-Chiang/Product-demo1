/** SearchCard Form */
export type SearchCardForm = {
  /** 分案類別 */
  caseCategory: string;
  /** 不法情資編號 */
  intelligenceNo: string;
  /** 調查進度 */
  investigateProgressCode: string;
  /** 情資來源案名 */
  itlgSrcCaseName: string;
  /** 主要對象姓名 */
  mainSuspectName: string;
  /** 提報單位 */
  itlgSrcReportUnitCode: string;
  /** 提報日期(起) */
  createTimeStart: string;
  /** 提報日期(迄) */
  createTimeEnd: string;
  /** 關鍵字 */
  key: string;
};

export interface CaseManagementModel {
  /// <summary>
  ///流水號
  /// </summary>
  seq: number;
  /// <summary>
  ///唯一序號,對應附加檔案及對象清單
  /// </summary>
  intelligenceCaseId: undefined;
  /// <summary>
  ///情資來源(單位代碼-國內,保防,洗防)
  /// </summary>
  itlgSrcUnitCode: string;
  /// <summary>
  ///情資來源編號
  /// </summary>
  itlgSrcNo: string;
  /// <summary>
  ///情資來源系統建立日期
  /// </summary>
  itlgSrcCreateTime: string;
  /// <summary>
  ///原始承辦人五碼
  /// </summary>
  itlgSrcSupervisorId: string;
  /// <summary>
  ///原始承辦人姓名
  /// </summary>
  itlgSrcSupervisorName: string;
  /// <summary>
  ///國情文號
  /// </summary>
  itlgSrcFileNo: string;
  /// <summary>
  ///情資來源案號
  /// </summary>
  itlgSrcCaseNo: string;
  /// <summary>
  ///情資來源案名
  /// </summary>
  itlgSrcCaseName: string;
  /// <summary>
  ///情資來源建檔日期
  /// </summary>
  itlgSrcCreateFileDate: string;
  /// <summary>
  ///案情摘要
  /// </summary>
  itlgSrcCaseAbstract: string;
  /// <summary>
  ///提報單位(情資來源下的單位)
  /// </summary>
  itlgSrcReportUnitCode: string;
  /// <summary>
  ///轉報人五碼(洗防處承辦人)
  /// </summary>
  itlgSrcTransReportPersonId: string;
  /// <summary>
  ///原報代號(承辦人五碼???)
  /// </summary>
  itlgSrcReportNumber: string;
  /// <summary>
  ///來源字號
  /// </summary>
  itlgSrcNumber: string;
  /// <summary>
  ///不法情資編號(分案時產生)
  /// </summary>
  intelligenceNo: string;
  /// <summary>
  ///分案單位(25:經防處31:廉政處)由分案人所屬單位決定
  /// </summary>
  caseDistributeUnit: string;
  /// <summary>
  ///分案類別(0:無,1:廉能,2:非廉能)無給經防用
  /// </summary>
  caseCategory: string;
  /// <summary>
  ///對象類別代碼
  /// </summary>
  objectCategory: string;
  /// <summary>
  ///承辦人單位代碼(科)
  /// </summary>
  supervisorDepartment: string;
  /// <summary>
  ///承辦人人事五碼
  /// </summary>
  supervisorId: string;
  /// <summary>
  ///公文號(從公文系統取得)
  /// </summary>
  receiveReportNum: string;
  /// <summary>
  ///情資所涉機關代碼
  /// </summary>
  itlgInvolvedAgencyCode: string;
  /// <summary>
  ///案件主類別代碼
  /// </summary>
  mainCaseType: string;
  /// <summary>
  ///案件次類別代碼
  /// </summary>
  subCaseType: string;
  /// <summary>
  ///主要對象序號(對應到ObjPerson資料表)
  /// </summary>
  objPersonId: undefined;
  /// <summary>
  ///主對象身分代碼(01公務員...)
  /// </summary>
  mainSuspectRole: string;
  /// <summary>
  ///主要對象身分證號 (ui 使用,身分證號比對用)
  /// </summary>
  mainSuspectId: string;
  /// <summary>
  ///主要對象姓名 (ui 使用 ,關鍵字查詢或基資比對用)
  /// </summary>
  mainSuspectName: string;
  /// <summary>
  ///調查進度代碼
  /// </summary>
  investigateProgressCode: string;
  /// <summary>
  ///發查日期(發給外勤)
  /// </summary>
  assignInvestigateDate: string;
  /// <summary>
  ///查覆日期
  /// </summary>
  reCheckDate: string;
  /// <summary>
  ///主案之情資編號(預設代入不法情資編號-分案時產生)
  /// </summary>
  mainCaseIntelligenceNumber: string;
  /// <summary>
  ///備註(情資研析)
  /// </summary>
  remark: string;
  /// <summary>
  ///案管案號(若該欄位有值,開啟頁面時,要自動從案管取該案件資訊)
  /// </summary>
  caseAdminNumber: string;
  /// <summary>
  ///提報日期(分案時間)
  /// </summary>
  createTime: string;
}
