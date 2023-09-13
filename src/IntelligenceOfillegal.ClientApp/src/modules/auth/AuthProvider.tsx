import { FC, ReactNode, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import * as AuthService from '@src/services/auth.service';
import {
  clearLoginInfo,
  checkIsLogged,
  getLoginUserInfo,
  setLoginInfo,
  getUserPermissions,
  getLoginInfo,
} from './utils';
import { AuthLoginInfo, AuthLoginUserInfo } from '@src/shared/types';
import { REFERRER_WHITELIST } from '@src/shared/constants';
import { Alert } from '@src/libs/alert';

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(() => checkIsLogged());
  const [user, setUser] = useState<AuthLoginUserInfo | null>(() => getLoginUserInfo());
  const [userPermissions, setUserPermissions] = useState<string[]>(() => getUserPermissions());

  const login = async (account: string, password: string) => {
    let lognInfo: AuthLoginInfo;

    // 呼叫 API 登入
    try {
      lognInfo = await AuthService.login(account, password);
    } catch (error) {
      throw error;
    }

    // 將 登入資訊 存到 LocalStorage
    try {
      setLoginInfo(lognInfo);
    } catch (error) {
      throw new Error('處理登入資訊發生錯誤。');
    }

    // 設定使用者資料
    setUser(lognInfo.userInfo);

    // 設定使用者權限列表
    setUserPermissions(getUserPermissions());

    // 設定登入 flag
    setIsLogged(true);
  };

  const loginsso = async () => {
    if (!REFERRER_WHITELIST.some((s) => s.includes(new URL(document.referrer).hostname))) {
      Alert.showError('跳轉發生錯誤');
      return;
    }
    const params = new URL(window.location.href).searchParams;

    if (!params.has('id') || !params.has('unitid')) {
      Alert.showError('跳轉發生錯誤');
      return;
    }

    const userId = params.get('id') as string;
    const unitId = params.get('unitid') as string;

    let lognInfo: AuthLoginInfo;

    // 呼叫 API 登入
    try {
      lognInfo = await AuthService.loginsso(userId, unitId);

      setLoginInfo(lognInfo);

      // 設定使用者資料
      setUser(lognInfo.userInfo);

      // 設定使用者權限列表
      setUserPermissions(getUserPermissions());

      // 設定登入 flag
      setIsLogged(true);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    clearLoginInfo();
    setIsLogged(false);
    setUser(null);
    setUserPermissions([]);
  };

  const hasPermission = (permission: string | string[]) => {
    const permissions = typeof permission === 'string' ? [permission] : permission;

    if (!isLogged) {
      return false;
    }

    return userPermissions.some((p) => permissions.includes(p));
  };

  const isExpired = () => {
    const timestampNow = Date.now();
    const loginInfo = getLoginInfo();
    // if (loginInfo && timestampNow >= loginInfo.expires) {
    //   logout();
    //   return true;
    // }
    return false;
  };

  const memoizedValue = useMemo(
    () => ({
      isLogged,
      user,
      userPermissions,
      login,
      loginsso,
      logout,
      hasPermission,
      isExpired,
    }),
    [isLogged, user, userPermissions],
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
};
