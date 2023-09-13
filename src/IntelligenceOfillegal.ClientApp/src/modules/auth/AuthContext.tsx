import { AuthLoginUserInfo } from '@src/shared/types';
import { createContext } from 'react';

export interface AuthContextValue {
  /** 是否登入 */
  isLogged: boolean;

  /** 登入使用者 */
  user: AuthLoginUserInfo | null;

  /** 使用者權限列表 */
  userPermissions: string[];

  /** 登入 */
  login: (account: string, password: string) => Promise<void>;

  /** 跳轉登入 */
  loginsso: () => Promise<void>;

  /** 登出 */
  logout: () => Promise<void>;

  /**
   * 是否有指定權限
   * @param permission 可傳入單個或多個權限字串
   * @return 回傳 true 代表有權限
   */
  hasPermission: (permission: string | string[]) => boolean;

  /**
   * Token是否到期
   * @return 回傳 true 代表到期
   */
  isExpired: () => boolean;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);
