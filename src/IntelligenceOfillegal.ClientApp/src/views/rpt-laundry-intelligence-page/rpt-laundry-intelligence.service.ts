import { APIPaginatedResponse, APIPaginatedQueryParams, SortedModel } from '@src/shared/types';
import { RptLaundryIntelligenceModel, SearchCardForm } from './types';
import { AdminHttpRequest } from '@src/services/requests';

/** 取得廉政處洗錢處理報表 - 請求資料 */
type FetchRptLaundryItlgQueryModel = APIPaginatedQueryParams & {
  /** 提報日期(起) */
  setFileStartDate: string;

  /** 提報日期(訖) */
  setFileEndDate: string;
};

/**
 * 取得廉政處洗錢處理報表
 * @param params 請求資料
 */
export const fetchRptLaundryItlgList = async (
  params: FetchRptLaundryItlgQueryModel,
): Promise<APIPaginatedResponse<RptLaundryIntelligenceModel[]>> => {
  const resp = await AdminHttpRequest.get<any>('/api/rptlaundryitlg', params);

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
 * 取得廉政處洗錢處理報表 Excel
 * @param params 請求資料
 */
export const exportExcel = async (formData: SearchCardForm, sortedInfo: SortedModel) => {
  await AdminHttpRequest.download('/api/rptlaundryitlg/export-excel', {
    ...formData,
    ...sortedInfo,
  });
};
