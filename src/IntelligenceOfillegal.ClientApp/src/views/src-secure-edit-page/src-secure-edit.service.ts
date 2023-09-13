import { APIPaginatedResponse, APIPaginatedQueryParams } from '@src/shared/types';
import { CaseDistributeEditModel } from './types';
import { AdminHttpRequest } from '@src/services/requests';

/** 取得外部情資案例資料列表 - 請求資料 */
type FetchExternalIntelligenceListQueryModel = APIPaginatedQueryParams & {
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

/**
 * 取得外部情資案例資料列表
 * @param params 請求資料
 */
export const fetchExternalIntelligence = (id: string) => {
  const resp = AdminHttpRequest.get<any>(`/api/intelligenceCase19/${id}`);

  return resp;
};

/** 建立分案資料 by id */
export const editCaseDistributeById = async (editModel: CaseDistributeEditModel) =>
  AdminHttpRequest.post(`/api/intelligenceCase19/case-distribute`, editModel);

/**
 * 取得外部情資案例選單列表
 * @param params 請求資料
 */
export const fetchExternalIntelligenceOption = (id: string) => {
  const resp = AdminHttpRequest.post<any>(`/api/intelligenceCase19/option`, id);

  return resp;
};
