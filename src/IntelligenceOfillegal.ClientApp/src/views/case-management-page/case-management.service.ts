import { APIPaginatedResponse, APIPaginatedQueryParams } from '@src/shared/types';
import { CaseManagementModel } from './types';
import { AdminHttpRequest } from '@src/services/requests';

/** 取得測試案例資料列表 - 請求資料 */
type FetchTestCaseListQueryModel = APIPaginatedQueryParams & {
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

/**
 * 刪除情資管理資料
 * @param params 請求資料
 */
export const deleteCaseManagementList = async (seq: string) =>
  await AdminHttpRequest.get(`/api/casemanagement/delete/${seq}`);

/**
 * 新增情資管理資料
 * @param params 請求資料
 */
export const createCaseManagementList = async () =>
  await AdminHttpRequest.get<string>(`/api/casemanagement/create`);

/**
 * 取得測試案例資料列表
 * @param params 請求資料
 */
export const fetchCaseManagementList = async (
  params: FetchTestCaseListQueryModel,
): Promise<APIPaginatedResponse<CaseManagementModel[]>> => {
  const resp = await AdminHttpRequest.get<any>('/api/casemanagement', params);

  return resp;
  // {
  //   paginatedInfo: {
  //     page: params.page,
  //     pageSize: params.pageSize,
  //     totalPage: resp.item2 > 0 ? Math.ceil(resp.item2 / params.pageSize) : 1,
  //     pageCount: resp.item1.length,
  //     totalCount: resp.item2,
  //   },
  //   data: resp.item1,
  // };
};
