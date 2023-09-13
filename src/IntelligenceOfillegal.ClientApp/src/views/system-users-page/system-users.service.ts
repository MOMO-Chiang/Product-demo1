import { APIPaginatedResponse, APIPaginatedQueryParams } from '@src/shared/types';
import { SystemUsersModel, SystemUsersEditModel, SystemUsersUpdateModel } from './types';
import { AdminHttpRequest } from '@src/services/requests';

/** 取得使用者資料列表 - 請求資料 */
type FetchSystemUsersQueryModel = APIPaginatedQueryParams & {
  /** 使用者帳號 */
  userId: string;
  /** 使用者名稱 */
  userName: string;
  /** 單位代碼 */
  unitCode: string;
  /** 單位名稱 */
  unitName: string;
  /** 身分別功能權限 */
  permission: string;
};

/**
 * 取得使用者資料列表
 * @param params 請求資料
 */
export const fetchSystemUsers = async (
  params: FetchSystemUsersQueryModel,
): Promise<APIPaginatedResponse<SystemUsersModel[]>> => {
  const resp = await AdminHttpRequest.get<any>('/api/systemUsers', params);

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

/** 修改使用者資料 by userId */
export const editSystemUsersByUserId = async (editModel: SystemUsersEditModel) =>
  AdminHttpRequest.put(`/api/systemUsers/edit/${editModel.userId}`, {
    isValid: editModel.isValid,
    permission: editModel.permission,
  });

/** 更新使用者資料 修改isValid by userId */
export const updateSystemUsersByUserId = async (updateModel: SystemUsersModel) =>
AdminHttpRequest.patch(`/api/systemUsers/edit/${updateModel.userId}`, updateModel);