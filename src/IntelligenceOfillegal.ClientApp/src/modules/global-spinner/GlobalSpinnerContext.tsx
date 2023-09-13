import { createContext } from 'react';

export interface SpinnerOptions {
  /** 識別 id */
  uid: string;
  /** 顯示文字 */
  message?: string;
}

export interface GlobalSpinnerContextValue {
  spinners: SpinnerOptions[];

  /**
   * 顯示 Global Spinner
   * @param spinnerId SpinnerId
   * @param message 要顯示的文字
   * @returns 顯示的 spinnerId
   */
  showSpinner: (spinnerId: string, message?: string) => string;

  /**
   * 隱藏 Global Spinner
   * @param spinnerId SpinnerId
   * @returns 隱藏的 spinnerId
   */
  hideSpinner: (spinnerId: string) => string;

  /**
   * 清除 spinner 顯示 (清除所有的 spinnerId)
   */
  clearSpinner: () => void;
}

export const GlobalSpinnerContext = createContext<GlobalSpinnerContextValue>({
  spinners: [],
  showSpinner: () => '',
  hideSpinner: () => '',
  clearSpinner: () => {},
});
