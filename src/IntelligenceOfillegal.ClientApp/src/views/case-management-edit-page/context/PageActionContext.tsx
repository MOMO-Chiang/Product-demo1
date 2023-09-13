import { PageChangeHandler, PageSizeSelectChangeHandler, SortChangeHandler } from '@src/components/data-grid';
import { ChangeEvent, createContext, useContext } from 'react';
import {
  ObjPerson,
  SupervisorModel,
  CaseManagementModel,
  CaseManagementTransferHistoryCreateParams,
} from '../types';

export interface PageActionContextValue {
  /** 初始頁面資料 */
  initPageData: (seq: string) => Promise<void>;

  /** 新增 submit 事件 */
  handleUpdateFormSubmit: (formData: CaseManagementModel) => Promise<void>;

  /** 承辦人 新增 submit 事件 */
  handleSupervisorFormSubmit: (formData: SupervisorModel) => Promise<void>;

  /** 上傳檔案處理分頁改變事件 */
  handlePageChange: PageChangeHandler;

  /** 上傳檔案處理排序改變事件 */
  handleSortChange: SortChangeHandler;

  /** 情資轉移歷程分頁改變事件 */
  handleCaseManagementTransferHistoryPageChange: PageChangeHandler;

  /** 情資轉移歷程排序改變事件 */
  handleCaseManagementTransferHistorySortChange: SortChangeHandler;

  /** 不法情資系統-對象姓名比對 分頁改變事件 */
  handleIntelligenceOfillegalCollisionPageChange: PageChangeHandler;

  /** 不法情資系統-對象姓名比對 排序改變事件 */
  handleIntelligenceOfillegalCollisionSortChange: SortChangeHandler;

  /** 上傳檔案事件 */
  UploadFile: (file: ChangeEvent<HTMLInputElement>) => void;

  /** 刪除上傳檔案 */
  DeteleFile: (seq: number) => void;

  /** 主對象清單處理分頁改變事件 */
  handleobjPersonPageChange: PageChangeHandler;

  /** 主對象清單處理排序改變事件 */
  handleobjPersonSortChange: SortChangeHandler;

  /** 承辦人上傳檔案事件 */
  UploadSupervisorFile: (file: ChangeEvent<HTMLInputElement>) => void;

  /** 承辦人刪除上傳檔案 */
  DeteleSupervisorFile: (seq: number) => void;

  /** 承辦人上傳檔案分頁改變事件 */
  handleSupervisorPageChange: PageChangeHandler;

  /** 承辦人上傳檔案處理排序改變事件 */
  handleSupervisorSortChange: SortChangeHandler;

  /** 關閉 ObjPersonCreateModal */
  closeObjPersonCreateModal: () => void;

  /** 開啟 ObjPersonCreateModal */
  openObjPersonCreateModal: () => void;

  /** 關閉 ObjPersonEditModal */
  closeObjPersonEditModal: () => void;

  /** 開啟 ObjPersonEditModal */
  openObjPersonEditModal: (seq: number) => void;

  /** 關閉 CaseManagementTransferModal */
  closeCaseManagementTransferModal: () => void;

  /** 開啟 CaseManagementTransferModal */
  openCaseManagementTransferModal: () => void;

  /** 關閉 SuspectNameCollisionModal */
  closeSuspectNameCollisionModal: () => void;

  /** 開啟 SuspectNameCollisionModal */
  openSuspectNameCollisionModal: (suspectname: string) => void;

  /** 情資轉移 */
  CaseManagementTransfer: (formData: CaseManagementTransferHistoryCreateParams) => void;

  /** 新增 ObjPerson */
  createObjPersonCreateModal: (formData: ObjPerson) => void;

  /** 修改 ObjPerson */
  updateObjPersonCreateModal: (formData: ObjPerson) => void;

  /** 刪除對象清單 */
  DeteleObjPerson: (seq: number) => void;

  /** 動態過濾情資所涉機關下拉選單 */
  FilterItlgInvolvedAgencySelectOptions: (key: string) => void;

  /** 下載附加檔案 */
  DownloadFile: (id: string) => void;
}

export const PageActionContext = createContext<PageActionContextValue>({} as PageActionContextValue);

export const usePageActionContext = () => {
  return useContext(PageActionContext);
};
