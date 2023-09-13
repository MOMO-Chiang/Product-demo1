import { PaginatedInfoModel, SelectOptionConfig, SortedModel } from '@src/shared/types';
import { createContext, useContext } from 'react';
import {
  CaseManagementModel,
  CaseManagementTransferHistory,
  ObjPerson,
  SupervisorModel,
  UploadFileList,
} from '../types';

export interface PageStateContext {
  /** 頁面讀取狀態 */
  isLoading: boolean;

  /** 情資案件 */
  caseManagementModel: CaseManagementModel;

  /** 承辦人情資案件 */
  supervisorModel: SupervisorModel;

  /** 附加檔案列表 */
  downloadFileLists: UploadFileList[];

  /** uploadFileList pkFiled */
  pkField: string;

  /** uploadFileList gridData */
  gridData: UploadFileList[];

  /** uploadFileList paginatedGridData */
  paginatedGridData: UploadFileList[];

  /** 上傳檔案分頁資料 */
  paginatedInfoModel: PaginatedInfoModel;

  /** 上傳檔案排序資料 */
  sortedModel: SortedModel;

  /** objPerson pkFiled */
  objPersonPkField: string;

  /** objPerson gridData */
  objPersonGridData: ObjPerson[];

  /** objPerson paginatedGridData */
  objPersonPaginatedGridData: ObjPerson[];

  /** 主對象清單分頁資料 */
  objPersonPaginatedInfoModel: PaginatedInfoModel;

  /** 主對象清單分頁資料排序資料 */
  objPersonSortedModel: SortedModel;

  /** supervisor pkFiled */
  supervisorPkField: string;

  /** supervisor gridData */
  supervisorGridData: UploadFileList[];

  /** supervisor paginatedGridData */
  supervisorPaginatedGridData: UploadFileList[];

  /** 承辦人上傳檔案分頁資料 */
  supervisorPaginatedInfoModel: PaginatedInfoModel;

  /** 承辦人上傳檔案分頁資料排序資料 */
  supervisorSortedModel: SortedModel;

  /** 情資轉移歷程 pkFiled */
  caseManagementTransferHistoryPkField: string;

  /** 情資轉移歷程 gridData */
  caseManagementTransferHistoryGridData: CaseManagementTransferHistory[];

  /** 情資轉移歷程 paginatedGridData */
  caseManagementTransferHistoryPaginatedGridData: CaseManagementTransferHistory[];

  /** 情資轉移歷程分頁資料 */
  caseManagementTransferHistoryPaginatedInfoModel: PaginatedInfoModel;

  /** 情資轉移歷程分頁資料排序資料 */
  caseManagementTransferHistorySortedModel: SortedModel;

  /** 不法情資系統-對象姓名比對 pkFiled */
  intelligenceOfillegalCollisionPkField: string;

  /** 不法情資系統-對象姓名比對 gridData */
  intelligenceOfillegalCollisionGridData: CaseManagementModel[];

  /** 不法情資系統-對象姓名比對 paginatedGridData */
  intelligenceOfillegalCollisionPaginatedGridData: CaseManagementModel[];

  /** 不法情資系統-對象姓名比對 分頁資料 */
  intelligenceOfillegalCollisionPaginatedInfoModel: PaginatedInfoModel;

  /** 不法情資系統-對象姓名比對 分頁資料排序資料 */
  intelligenceOfillegalCollisionSortedModel: SortedModel;

  /** 比對對象姓名 */
  collisionSuspectName: string;

  /** 顯示 ObjPersonCreateModal */
  isShowObjPersonCreateModal: boolean;

  /** 顯示 ObjPersonEditModal */
  isShowObjPersonEditModal: boolean;

  /** 顯示 CaseManagementTransferModalModal */
  isShowCaseManagementTransferModal: boolean;

  /** 顯示 SuspectNameCollisionModal */
  isShowSuspectNameCollisionModal: boolean;

  /** 編輯 ObjPersonEditModal */
  editObjPersonModal: ObjPerson;

  /** 下拉選單資料 */
  itlgSrcUnitCodeSelectOptions: SelectOptionConfig[];
  objectCategorySelectOptions: SelectOptionConfig[];
  unitCodeSelectOptions: SelectOptionConfig[];
  caseCategorySelectOptions: SelectOptionConfig[];
  supervisorDepartmentSelectOptions: SelectOptionConfig[];
  mainSuspectRoleSelectOptions: SelectOptionConfig[];
  mainCaseTypeSelectOptions: SelectOptionConfig[];
  subCaseTypeSelectOptions: SelectOptionConfig[];
  investigateProgressSelectOptions: SelectOptionConfig[];
  objectPersonSelectOptions: SelectOptionConfig[];
  itlgInvolvedAgencySelectOptions: SelectOptionConfig[];
  supervisorSelectOptions: SelectOptionConfig[];
}

export const PageStateContext = createContext<PageStateContext>({} as PageStateContext);

export const usePageStateContext = () => {
  return useContext(PageStateContext);
};
