import { useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { GlobalSpinnerContext, SpinnerOptions } from './GlobalSpinnerContext';

export interface UseGlobalSpinnerReturn {
  /**
   * @private
   * 當前所有的 spinners。
   * 只在 `GlobalSpinner` 中被使用。
   */
  _spinners: SpinnerOptions[];

  /**
   * 顯示 spinner
   * @param message 要顯示訊息
   * @returns 顯示的 spinnerId
   */
  showSpinner: (message?: string) => string;

  /**
   * 隱藏 spinner
   * @returns 隱藏的 spinnerId
   */
  hideSpinner: () => string;

  /**
   * 清除所有 spinner 顯示
   */
  clearSpinner: () => void;
}

/**
 * Hook for control `GlobalSpinner` show and hide.
 * @param spinnerId SpinnerId
 * @returns `UseGlobalSpinnerReturn`
 */
export function useGlobalSpinner(spinnerId?: string): UseGlobalSpinnerReturn {
  const [id] = useState(spinnerId || uuidV4());

  const { spinners, showSpinner, hideSpinner, clearSpinner } = useContext(GlobalSpinnerContext);

  return {
    _spinners: spinners,
    showSpinner: () => showSpinner(id),
    hideSpinner: () => hideSpinner(id),
    clearSpinner,
  };
}
