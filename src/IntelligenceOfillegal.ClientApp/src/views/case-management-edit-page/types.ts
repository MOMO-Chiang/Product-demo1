import { SelectOptionConfig } from '@src/shared/enums';

export interface CaseManagementModel {
  /// <summary>
  ///seq
  /// </summary>
  seq: string;
  /// <summary>
  ///情資id
  /// </summary>
  intelligenceCaseId: string;
  /// <summary>
  ///不法情資編號(分案時產生)
  /// </summary>
  intelligenceNo: string;
  /// <summary>
  ///調查進度代碼
  /// </summary>
  investigateProgressCode: string;
  /// <summary>
  ///情資來源(單位代碼-國內,保防,洗防)
  /// </summary>
  itlgSrcUnitCode: string;
  /// <summary>
  ///情資來源編號
  /// </summary>
  itlgSrcNo: string;
  /// <summary>
  ///對象類別代碼
  /// </summary>
  objectCategory: string;
  /// <summary>
  ///提報日期(分案時間)
  /// </summary>
  createTime: string;
  /// <summary>
  ///公文號(從公文系統取得)
  /// </summary>
  receiveReportNum: string;
  /// <summary>
  ///單位代碼(提報單位)
  /// </summary>
  itlgSrcReportUnitCode: string;
  /// <summary>
  ///原報代號(承辦人五碼???)
  /// </summary>
  itlgSrcReportNumber: string;
  /// <summary>
  ///轉報人五碼(洗防處承辦人)
  /// </summary>
  itlgSrcTransReportPersonId: string;
  /// <summary>
  ///情資所涉機關名稱
  /// </summary>
  itlgInvolvedAgencyCode: string;
  /// <summary>
  ///主對象姓名(或公司名稱)
  /// </summary>
  mainSuspectName: string;
  /// <summary>
  ///主對象身分證號
  /// </summary>
  mainSuspectId: string;
  /// <summary>
  ///分案類別(0:無,1:廉能,2:非廉能)無給經防用
  /// </summary>
  caseCategory: string;
  /// <summary>
  ///承辦人單位代碼(科)
  /// </summary>
  supervisorDepartment: string;
  /// <summary>
  ///原始承辦人姓名
  /// </summary>
  itlgSrcSupervisorName: string;
  /// <summary>
  ///原始承辦人五碼
  /// </summary>
  itlgSrcSupervisorId: string;
  /// <summary>
  ///主對象身分代碼(01公務員...)
  /// </summary>
  mainSuspectRole: string;
  /// <summary>
  ///情資來源案名
  /// </summary>
  itlgSrcCaseName: string;
  /// <summary>
  ///案情摘要
  /// </summary>
  itlgSrcCaseAbstract: string;
  /// <summary>
  ///分案單位(25:經防處31:廉政處)由分案人所屬單位決定
  /// </summary>
  caseDistributeUnit: string;
  /// <summary>
  ///情資來源建檔日期
  /// </summary>
  itlgSrcCreateFileDate: string;
  /// <summary>
  ///來源字號
  /// </summary>
  itlgSrcNumber: string;
}

export interface SupervisorModel {
  /// <summary>
  ///不法情資編號(分案時產生)
  /// </summary>
  intelligenceNo: string;
  /// <summary>
  ///調查進度代碼
  /// </summary>
  investigateProgressCode: string;
  /// <summary>
  ///發查日期
  /// </summary>
  assignInvestigateDate: string;
  /// <summary>
  ///查覆日期
  /// </summary>
  reCheckDate: string;
  /// <summary>
  ///主案之情資編號
  /// </summary>
  mainCaseIntelligenceNumber: string;
  /// <summary>
  /// 備註(情資研析)
  /// </summary>
  remark: string;
  /// <summary>
  /// 案管案號
  /// </summary>
  caseAdminNumber: string;
  /// <summary>
  /// 案件主類別
  /// </summary>
  mainCaseType: string;
  /// <summary>
  /// 案件次類別
  /// </summary>
  subCaseType: string;
}

export interface UploadFileList {
  file: File;
  seq: number;
  originFileName: string;
  createPersonId: string | undefined;
  createTime: string;
  userUploadType: number;
  intelligenceFileId: string | null;
}

export interface ObjPerson {
  seq: number;
  isMainSuspect: boolean;
  personTitle: string;
  personName: string;
  personID: string;
  isReportLink: boolean;
  createPersonId: string | undefined;
  createTime: string;
  objPersonId: string | null;
}

export interface CaseManagementSelectOptions {
  itlgSrcUnitCodeSelectOptions: SelectOptionConfig[];
  objectCategorySelectOptions: SelectOptionConfig[];
  unitCodeSelectOptions: SelectOptionConfig[];
  caseCategorySelectOptions: SelectOptionConfig[];
  supervisorDepartmentSelectOptions: SelectOptionConfig[];
  mainSuspectRoleSelectOptions: SelectOptionConfig[];
  mainCaseTypeSelectOptions: SelectOptionConfig[];
  subCaseTypeSelectOptions: SelectOptionConfig[];
  investigateProgressSelectOptions: SelectOptionConfig[];
  supervisorSelectOptions: SelectOptionConfig[];
}

export interface CaseManagementUpdateParams {
  caseManagement: CaseManagementModel;
  objPersons: ObjPerson[];
  uploadFileLists: UploadFileList[];
  //fileForm: FormData;
}

export interface SupervisorUpdateParams {
  supervisorCaseManagement: SupervisorModel;
  uploadFileLists: UploadFileList[];
  //fileForm: FormData;
}

export interface CaseCaseManagementEditModel {
  caseManagement: CaseManagementModel;
  supervisorCaseManagement: SupervisorModel;
  objPersons: ObjPerson[];
  uploadFileLists: UploadFileList[];
  supervisorUploadFileLists: UploadFileList[];
  downloadFileLists: UploadFileList[];
}

export interface CaseManagementTransferHistory {
  /// <summary>
  ///流水號
  /// </summary>
  seq: number;
  /// <summary>
  ///原始承辦人五碼
  /// </summary>
  originPersonId: string;
  /// <summary>
  ///新承辦人五碼
  /// </summary>
  newPersonId: string;
  /// <summary>
  ///更新時間
  /// </summary>
  updateTime: string;
  /// <summary>
  ///更新人員
  /// </summary>
  updateUser: string;
  /// <summary>
  ///ip
  /// </summary>
  createIP: string;
  /// <summary>
  ///情資Id
  /// </summary>
  intelligenceCaseId: string;
}

export interface CaseManagementTransferHistoryCreateParams {
  newPersonId: string;
  newPersonName: string;
  intelligenceCaseId: string;
}
