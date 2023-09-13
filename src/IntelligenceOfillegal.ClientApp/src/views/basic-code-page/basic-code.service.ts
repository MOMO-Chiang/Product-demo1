import { APIPaginatedResponse, APIPaginatedQueryParams } from '@src/shared/types';
import { BasicCodeModel, BasicCodeCreateModel, BasicCodeEditModel, BasicCodeUpdateModel } from './types';
import { AdminHttpRequest } from '@src/services/requests';
import { SelectOption } from '@src/components/form';

/** 取得基礎代碼列表 - 請求資料 */
type FetchBasicCodeQueryModel = APIPaginatedQueryParams & {
  /** 類別代碼 */
  categoryCode: string;
  /** 類別代碼名稱 */
  category: string;
};

/**
 * 取得基礎代碼列表
 * @param params 請求資料
 */
export const fetchBasicCode = async (
  params: FetchBasicCodeQueryModel,
): Promise<APIPaginatedResponse<BasicCodeModel[]>> => {
  const resp = await AdminHttpRequest.get<any>('/api/basicCode', params);

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

/** 新增基礎代碼  */
export const createBasicCode = async (createModel: BasicCodeCreateModel) =>
AdminHttpRequest.post(`/api/basicCode/add/`, createModel);

/** 修改基礎代碼 by value */
export const editBasicCodeByValue = async (editModel: BasicCodeEditModel) =>
  AdminHttpRequest.put(`/api/basicCode/edit/${editModel.value}`, editModel);

/** 更新基礎代碼 修改isActived by value */
export const updateBasicCodeByValue = async (updateModel: BasicCodeModel) =>
AdminHttpRequest.patch(`/api/basicCode/edit/${updateModel.value}`, updateModel);

/** 取得基礎代碼 類別項目清單 */
export const fetchCategoryCode = async (): Promise<SelectOption[]> => {
  const resp = await AdminHttpRequest.get<any>('/api/basicCode/categoryCode');
  return resp;
};
