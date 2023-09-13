import { APIPaginatedResponse, APIPaginatedQueryParams, SortedModel } from '@src/shared/types';
import { RptIntelligenceSourceModel, SearchCardForm } from './types';
import { AdminHttpRequest } from '@src/services/requests';

/** 取得專案情資來源件數統計 - 請求資料 */
type FetchRptIntelligenceSourceQueryModel = APIPaginatedQueryParams & {
  /** 提報日期(起) */
  setFileStartDate: string;

  /** 提報日期(訖) */
  setFileEndDate: string;

  /** 案件類別 */
  caseType: string;
};

/**
 * 取得專案情資來源件數統計
 * @param params 請求資料
 */
export const fetchRptIntelligenceSourceList = async (
  params: FetchRptIntelligenceSourceQueryModel,
): Promise<APIPaginatedResponse<RptIntelligenceSourceModel[]>> => {
  const resp = await AdminHttpRequest.get<any>('/api/rptintelligencesource', params);

  return resp;
};

/**
 * 取得專案情資來源件數統計 Excel
 * @param params 請求資料
 */
export const exportExcel = async (formData: SearchCardForm, sortedInfo: SortedModel) => {
  await AdminHttpRequest.download('/api/rptintelligencesource/export-excel', {
    ...formData,
    ...sortedInfo,
  });
};
