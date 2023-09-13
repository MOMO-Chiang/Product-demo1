import { APIPaginatedResponse, APIPaginatedQueryParams, SortedModel } from '@src/shared/types';
import { RptIncorruptionIntelligenceModel, SearchCardForm } from './types';
import { AdminHttpRequest } from '@src/services/requests';

/** 取得廉政處國情處理報表 - 請求資料 */
type FetchRptIncorruptionItlgQueryModel = APIPaginatedQueryParams & {
  /** 提報日期(起) */
  setFileStartDate: string;

  /** 提報日期(訖) */
  setFileEndDate: string;

  /** 提報單位 */
  itlgSrcReportUnitName: string;
};

/**
 * 取得廉政處國情處理報表
 * @param params 請求資料
 */
export const fetchRptIncorruptionItlgList = async (
  params: FetchRptIncorruptionItlgQueryModel,
): Promise<APIPaginatedResponse<RptIncorruptionIntelligenceModel[]>> => {
  const resp = await AdminHttpRequest.get<any>('/api/rptincorruptionitlg', params);

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

/**
 * 取得廉政處國情處理報表 Excel
 * @param params 請求資料
 */
export const exportExcel = async (formData: SearchCardForm, sortedInfo: SortedModel) => {
  await AdminHttpRequest.download('/api/rptincorruptionitlg/export-excel', {
    ...formData,
    ...sortedInfo,
  });
};
