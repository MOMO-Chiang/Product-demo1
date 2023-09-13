import { APIPaginatedResponse, APIPaginatedQueryParams } from '@src/shared/types';
import { ExternalIntelligenceModel } from './types';
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
export const fetchExternalIntelligenceList = async (
  params: FetchExternalIntelligenceListQueryModel,
): Promise<APIPaginatedResponse<ExternalIntelligenceModel[]>> => {
  const resp = await AdminHttpRequest.get<any>('/api/intelligenceCase18', params);

  return resp;
};
