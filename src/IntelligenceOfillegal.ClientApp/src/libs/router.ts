/**
 * 此檔案為 `react-router-dom` 套件之接口。
 *
 * 目的：
 *   1. 更好的統一處理路由套件的問題。
 *   2. 可在此定義或封裝一些常用的路由 `function` 。
 */

import { NavigateOptions, useNavigate } from 'react-router-dom';

export * from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const push = (routePath: string, options?: NavigateOptions) => {
    console.log('push:', routePath);
    navigate(routePath, { replace: true, relative: 'path' });
  };

  const replace = (routePath: string, options?: NavigateOptions) => {
    navigate(routePath, { ...options, replace: true });
  };

  const back = () => {
    navigate(-1);
  };

  return {
    push,
    replace,
    back,
  };
};
