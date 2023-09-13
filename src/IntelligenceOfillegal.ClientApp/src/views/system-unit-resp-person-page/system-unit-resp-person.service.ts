import { APIPaginatedResponse, APIPaginatedQueryParams, SelectOptionConfig } from '@src/shared/types';
import {
  SearchCardForm,
  ResponsiblePerson,
  SystemUnitRespPersonCreateModel,
  SystemUnitRespPersonEditModel,
  SystemUnitRespPersonModel,
} from './types';
import { AdminHttpRequest } from '@src/services/requests';

/** 取得承辦人資料列表 - 請求資料 */
type FetchSystemUnitRespPersonQueryModel = APIPaginatedQueryParams & SearchCardForm;

/**
 * 取得單位承辦人資料列表
 * @param params 請求資料
 */
export const fetchSystemUnitRespPerson = async (
  params: FetchSystemUnitRespPersonQueryModel,
): Promise<APIPaginatedResponse<SystemUnitRespPersonModel[]>> => {
  const resp = await AdminHttpRequest.get<any>('/api/systemunitrespperson', params);

  return resp;
};

/**
 * 取得承辦人下拉選項
 * @param params 請求資料
 */
export const fetchRespPersonList = async (params: ResponsiblePerson): Promise<SelectOptionConfig[]> => {
  const resp = await AdminHttpRequest.get<any>('/api/systemunitrespperson/selectoptions', params);

  return resp;
};

/** 新增 */
export const createSystemUnitRespPerson = async (createModel: SystemUnitRespPersonCreateModel) => {
  AdminHttpRequest.post(`/api/system-unit-resp-person`, {
    idCardNum: createModel.idCardNum,
    fullName: createModel.fullName,
    gender: createModel.gender,
    phoneNumber: createModel.phoneNumber,
    email: createModel.email,
  });
};

/** 修改 by seq */
export const editSystemUnitRespPersonById = async (editModel: SystemUnitRespPersonEditModel) => {
  AdminHttpRequest.post(`/api/systemunitrespperson/edit/${editModel.seq}`, {
    responsiblePerson1: editModel.responsiblePerson1,
    responsiblePerson2: editModel.responsiblePerson2,
    responsiblePerson3: editModel.responsiblePerson3,
  });
};

/** 刪除 */
export const deleteSystemUnitRespPersonById = async (deleteModel: SystemUnitRespPersonModel) => {
  AdminHttpRequest.delete(`/api/system-unit-resp-person/${deleteModel.systemPlatformUnitName}`);
};
