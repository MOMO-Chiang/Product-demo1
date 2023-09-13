import { APIPaginatedResponse, APIPaginatedQueryParams, SortedModel } from '@src/shared/types';
import { RptEconomyIntelligenceModel, SearchCardForm } from './types';
import { AdminHttpRequest } from '@src/services/requests';

/** 取得經防處國情處理報表資料列表 - 請求資料 */
type FetchRptEconomyIntelligenceQueryModel = APIPaginatedQueryParams & {
  /** 建檔日期(起)(原收文日期) */
  setFileStartDate: string;

  /** 建檔日期(迄)(原收文日期) */
  setFileEndDate: string;

  /** 來文單位 (中文名稱) */
  itlgSrcReportUnitName: string;
};

/**
 * 取得經防處國情處理報表資料列表
 * @param params 請求資料
 */
export const fetchRptEconomyIntelligenceList = async (
  params: FetchRptEconomyIntelligenceQueryModel,
): Promise<APIPaginatedResponse<RptEconomyIntelligenceModel[]>> => {
  const resp = await AdminHttpRequest.get<any>('/api/rpteconomyitlg', params);

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
 * 取得經防處國情處理報表資料 Excel
 * @param params 請求資料
 */
export const exportExcel = async (formData: SearchCardForm, sortedInfo: SortedModel) => {
  await AdminHttpRequest.download('/api/rpteconomyitlg/export-excel', {
    ...formData,
    ...sortedInfo,
  });
};
