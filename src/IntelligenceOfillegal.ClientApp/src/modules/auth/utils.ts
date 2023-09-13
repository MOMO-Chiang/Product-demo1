import { AuthLoginInfo } from '@src/shared/types';
import * as AppSettings from '@src/shared/app-settings';

/**
 * 確認是否登入
 * @returns
 */
export const checkIsLogged = () => {
  const loginInfo = getLoginInfo();

  // 確認是否有登入資訊
  if (!loginInfo) {
    return false;
  }

  // 確認是否有 token
  if (!loginInfo.token) {
    return false;
  }

  // 確認是否過期
  const timestampNow = Date.now();
  // if (timestampNow >= loginInfo.expires) {
  //   return false;
  // }

  return true;
};

/**
 * 取得登入資訊資料
 * @returns 登入資訊資料
 */
export const getLoginInfo = () => {
  const loginInfoStr = window.localStorage.getItem(AppSettings.LOGIN_INFO_STORAGE_KEY);
  let loginInfo: AuthLoginInfo | null;

  try {
    loginInfo = loginInfoStr ? JSON.parse(loginInfoStr) : null;
  } catch {
    loginInfo = null;
  }

  return loginInfo;
};

/**
 * 取得登入者資料
 * @returns `AuthLoginUserInfo`
 */
export const getLoginUserInfo = () => {
  const info = getLoginInfo();
  return info ? info.userInfo : null;
};

export const getUserPermissions = () => {
  const loginInfo = getLoginInfo();

  if (!loginInfo) {
    return [];
  }

  return Object.keys(loginInfo.permissions).filter((key) => (loginInfo.permissions as any)[key]);
};

/**
 * 儲存 登入資訊 至 LocalStorage
 * @param loginInfo
 */
export const setLoginInfo = (loginInfo: AuthLoginInfo) => {
  window.localStorage.setItem(AppSettings.LOGIN_INFO_STORAGE_KEY, JSON.stringify(loginInfo));
};

/**
 * 清除當前的 登入資訊
 */
export const clearLoginInfo = () => {
  window.localStorage.removeItem(AppSettings.LOGIN_INFO_STORAGE_KEY);
};

/** 取得 Token */
export const getToken = () => {
  const loginInfo = getLoginInfo();

  return loginInfo ? loginInfo.token : null;
};
