import Swal, { SweetAlertPosition } from 'sweetalert2';

const CustomSwal = Swal.mixin({});

enum AlertType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
  Question = 'question',
}

enum ButtonType {
  Primary = 'Primary',
  Success = 'Success',
  Warning = 'Warning',
  Danger = 'Danger',
  Cancel = 'Cancel',
  Info = 'Info',
}

enum ButtonTypeColor {
  Primary = '#7367f0',
  Success = '#28c76f',
  Warning = '#ff9f43',
  Danger = '#ea5455',
  Cancel = '#82868b',
  Info = '#00cfe8',
}

export type AlertOptions = {
  /** AlertType */
  type: AlertType | undefined;
  /** 標題 */
  title?: string;
  /**
   * 內文
   * @example
   * { ..., text: '錯誤訊息第一行 \n 錯誤訊息第二行', ... }
   */
  text?: string;
  /** 確認按鈕的類型 */
  confirmButtonType?: ButtonType;
  /** 取消按鈕的類型 */
  cancelButtonType?: ButtonType;
  /** 確認按鈕文字 */
  confirmButtonText?: string;
  /** 取消按鈕文字 */
  cancelButtonText?: string;
  /** 是否顯示確認按鈕 */
  showConfirmButton?: boolean;
  /** 是否顯示取消按鈕 */
  showCancelButton?: boolean;
  /** 指定秒數(ms)後自動消失 */
  timer?: number;
  /** 背景顏色 */
  background?: string;
  /** 文字顏色 */
  color?: string | undefined;
  /** 彈窗位置 */
  position?: SweetAlertPosition;
  /** 寬度 */
  width?: string;
  /** 背景是否disable */
  disablebackground?: boolean;
  /** 標題自定義class */
  titleCustomClass?: string;
};

const show = async (options?: AlertOptions) => {
  const result = await CustomSwal.fire({
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    icon: (options && options.type) || undefined,
    title: (options && options.title) || '',
    html: (options && options.text && options.text.replaceAll('\n', '<br/>')) || '',
    timer: options && options.timer,
    background: (options && options.background) || undefined,
    position: (options && options.position) || 'center',
    color: (options && options.color) || undefined,
    width: (options && options.width) || undefined,
    // Confirm Button
    showConfirmButton:
      options && typeof options.showConfirmButton !== 'undefined' ? options.showConfirmButton : true,
    confirmButtonText: (options && options.confirmButtonText) || '確定',
    confirmButtonColor:
      options && options.confirmButtonType
        ? ButtonTypeColor[options.confirmButtonType]
        : ButtonTypeColor[ButtonType.Primary],

    // Cancel Button
    showCancelButton:
      options && typeof options.showCancelButton !== 'undefined' ? options.showCancelButton : true,
    cancelButtonText: (options && options.cancelButtonText) || '取消',
    cancelButtonColor:
      options && options.cancelButtonType
        ? ButtonTypeColor[options.cancelButtonType]
        : ButtonTypeColor[ButtonType.Cancel],
    showClass: {
      backdrop:
        (options && options.disablebackground ? 'swal2-backdrop-hide' : 'swal2-backdrop-show') ||
        'swal2-backdrop-show',
    },
    customClass: {
      title: (options && options.titleCustomClass) || '',
    },
  });

  return result.isConfirmed;
};

/**
 * 顯示錯誤訊息
 * @param title 標題
 * @param text 文字
 */
const showError = async (title: string, text?: string): Promise<void> => {
  await show({
    type: Alert.AlertType.Error,
    title,
    text,
    showCancelButton: false,
  });
};

/**
 * 顯示成功訊息
 * @param title 標題
 * @param text 文字
 */
const showSuccess = async (title: string, text?: string): Promise<void> => {
  await show({
    type: Alert.AlertType.Success,
    title,
    text,
    showCancelButton: false,
  });
};

/**
 * 顯示提示訊息
 * @param title 標題
 * @param text 文字
 */
const showHint = async (title: string, timer?: number, width?: string): Promise<void> => {
  await show({
    type: undefined,
    title,
    showCancelButton: false,
    showConfirmButton: false,
    timer: timer,
    background: 'rgba(0,0,0,0.5)',
    position: 'top-right',
    color: 'white',
    width: width,
    disablebackground: true,
    titleCustomClass: 'hint-class',
  });
};

export const Alert = {
  AlertType,
  ButtonType,
  show,
  showError,
  showSuccess,
  showHint,
};
