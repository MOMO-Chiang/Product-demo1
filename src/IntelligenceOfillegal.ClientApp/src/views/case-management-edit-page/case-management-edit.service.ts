import {
  CaseCaseManagementEditModel,
  CaseManagementModel,
  CaseManagementSelectOptions,
  CaseManagementTransferHistory,
  CaseManagementTransferHistoryCreateParams,
} from './types';
import { AdminHttpRequest } from '@src/services/requests';
import { HttpRequestOptions } from '@src/shared/http-request';

/**
 * 編輯情資管理
 * @param params 請求資料
 */
export const updateCaseManagementList = async (params: FormData) => {
  const options: HttpRequestOptions = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  await AdminHttpRequest.post('/api/casemanagement/update', params, options);
};

/**
 * 承辦人編輯情資管理
 * @param params 請求資料
 */
export const updateSupervisor = async (params: FormData) => {
  const options: HttpRequestOptions = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  await AdminHttpRequest.post('/api/casemanagement/updatesupervisor', params, options);
};

/**
 * 取得情資管理編輯資料
 * @param params 請求資料
 */
export const fetchCaseManagementList = async (seq: string) =>
  await AdminHttpRequest.get<CaseCaseManagementEditModel>(`/api/casemanagement/${seq}`);

/**
 * 取得下拉選單
 * @param params 請求資料
 */
export const fetchCaseManagementSelectOptions = async () =>
  await AdminHttpRequest.get<CaseManagementSelectOptions>('/api/casemanagement/selectoptions');

/**
 * 取得不法情資編號
 * @param params 請求資料
 */
export const fetchIntelligenceNo = async () =>
  await AdminHttpRequest.get<string>('/api/casemanagement/intelligenceno');

/**
 * 下載附加檔案
 * @param params 請求資料
 */
export const downloadFile = async (id: string) =>
  await AdminHttpRequest.download(`/api/casemanagement/download/${id}`);

/**
 * 取得情資轉移歷程
 * @param params 請求資料
 */
export const fetchCaseManagementTransferHistory = async (intelligencecaseid: string) =>
  await AdminHttpRequest.get<CaseManagementTransferHistory[]>(
    `/api/casemanagement/casemanagementtransferhistory/${intelligencecaseid}`,
  );

/**
 * 新增情資轉移歷程
 * @param params 請求資料
 */
export const createCaseManagementTransferHistory = async (
  params: CaseManagementTransferHistoryCreateParams,
) => await AdminHttpRequest.post(`/api/casemanagement/casemanagementtransferhistory/create`, params);

/**
 * 對象姓名比對結果
 * @param params 請求資料
 */
export const mainSuspectNameCollision = async (mainsuspectname: string) =>
  await AdminHttpRequest.get<CaseManagementModel[]>(
    `/api/casemanagement/suspectnamecollision/${mainsuspectname}`,
  );
