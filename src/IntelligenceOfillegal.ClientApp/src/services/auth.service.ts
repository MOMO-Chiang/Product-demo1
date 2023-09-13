import { AuthLoginInfo } from '@src/shared/types';
import { AdminHttpRequest } from './requests';

/**
 * 登入
 * @param account 帳號
 * @param password 密碼
 */
export const login = (account: string, password: string) => {
  return AdminHttpRequest.post<AuthLoginInfo>('/api/auth/login', { account, password });
};

/**
 * 跳轉登入
 * @param account 帳號
 */
export const loginsso = (userId: string, unitId: string) => {
  return AdminHttpRequest.post<AuthLoginInfo>('/api/auth/login/sso', { userId, unitId });
};
