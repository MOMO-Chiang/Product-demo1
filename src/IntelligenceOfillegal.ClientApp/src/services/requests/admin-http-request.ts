import { httpRequest, HttpRequestOptions, HttpRequestError } from '@src/shared/http-request';
import { getToken } from '@src/modules/auth';

export type AdminHttpRequestOptions = HttpRequestOptions;

export type AdminHttpRequestErrorData = {
  /** 狀態碼 */
  status: number;
  /** 錯誤類別 */
  type: string;
  /** 錯誤訊息  */
  message: string;
  /** 詳細錯誤訊息 */
  details: string;
  /** StackTrace from backend */
  stackTrace: string | null;
};

export class AdminHttpRequestError extends Error {
  status: number;
  type: string;
  details: string;
  stackTrace: string | null;

  constructor(props: AdminHttpRequestErrorData) {
    super(props.message);
    this.name = 'AdminHttpRequestError';
    this.message = props.message;
    this.status = props.status;
    this.type = props.type;
    this.details = props.details;
    this.stackTrace = props.stackTrace;
  }
}

type AdminHttpRequestErrorResponseData = {
  error: {
    status: number;
    type: string;
    details: string;
    stackTrace: string | null;
    message: string;
  };
};

export const AdminHttpRequest = async <TData>(options: AdminHttpRequestOptions) => {
  let baseHeaders: Record<string, any> = {
    'Content-Type': 'application/json;charset=UTF-8',
  };

  const token = getToken();
  if (token) {
    baseHeaders = { ...baseHeaders, CustomAuthorization: `Bearer ${token}` };
  }

  const _options = {
    ...options,
    headers: { ...baseHeaders, ...options.headers },
  };

  try {
    const response = await httpRequest<TData>(_options);
    return response.data;
  } catch (err) {
    const error = err as HttpRequestError<AdminHttpRequestErrorResponseData>;

    if (error.response && error.response.data && error.response.data.error) {
      throw new AdminHttpRequestError({
        status: error.response.status,
        type: error.response.data.error.type,
        message: error.response.data.error.message,
        details: error.response.data.error.details,
        stackTrace: error.response.data.error.stackTrace,
      });
    }

    if (error.response) {
      throw new AdminHttpRequestError({
        status: error.response.status,
        type: 'FRONTEND_UNKNOWN_ERROR',
        message: `[${error.response.status}] 請求連線發生錯誤。\n\nDetails: ${error.message}`,
        details: error.message,
        stackTrace: error.stack || null,
      });
    }

    throw new AdminHttpRequestError({
      status: 500,
      type: 'FRONTEND_UNKNOWN_ERROR_AND_NO_RESPONSE',
      message: `[500] 請求連線發生未知錯誤。\n\nDetails: ${error.message}`,
      details: error.message,
      stackTrace: error.stack || null,
    });
  }
};

export const AdminHttpRequestFile = async <TData>(options: AdminHttpRequestOptions) => {
  let baseHeaders: Record<string, any> = {
    'Content-Type': 'application/json;charset=UTF-8',
  };

  const token = getToken();
  if (token) {
    baseHeaders = { ...baseHeaders, CustomAuthorization: `Bearer ${token}` };
  }

  const _options = {
    ...options,
    headers: { ...baseHeaders, ...options.headers },
  };

  try {
    const response = await httpRequest<TData>(_options);
    return response;
  } catch (err) {
    const error = err as HttpRequestError<AdminHttpRequestErrorResponseData>;

    if (error.response && error.response.data && error.response.data.error) {
      throw new AdminHttpRequestError({
        status: error.response.status,
        type: error.response.data.error.type,
        message: error.response.data.error.message,
        details: error.response.data.error.details,
        stackTrace: error.response.data.error.stackTrace,
      });
    }

    if (error.response) {
      throw new AdminHttpRequestError({
        status: error.response.status,
        type: 'FRONTEND_UNKNOWN_ERROR',
        message: `[${error.response.status}] 請求連線發生錯誤。\n\nDetails: ${error.message}`,
        details: error.message,
        stackTrace: error.stack || null,
      });
    }

    throw new AdminHttpRequestError({
      status: 500,
      type: 'FRONTEND_UNKNOWN_ERROR_AND_NO_RESPONSE',
      message: `[500] 請求連線發生未知錯誤。\n\nDetails: ${error.message}`,
      details: error.message,
      stackTrace: error.stack || null,
    });
  }
};

const appHttpGet = <TData = any>(url: string, params?: any, options?: AdminHttpRequestOptions) => {
  return AdminHttpRequest<TData>({
    url,
    params,
    method: 'GET',
    ...options,
  });
};

const appHttpPost = <TData = any>(url: string, data?: any, options?: AdminHttpRequestOptions) => {
  return AdminHttpRequest<TData>({
    url,
    data,
    method: 'POST',
    ...options,
  });
};

const appHttpPut = <TData = any>(url: string, data?: any, options?: AdminHttpRequestOptions) => {
  return AdminHttpRequest<TData>({
    url,
    data,
    method: 'PUT',
    ...options,
  });
};

const appHttpPatch = <TData = any>(url: string, data?: any, options?: AdminHttpRequestOptions) => {
  return AdminHttpRequest<TData>({
    url,
    data,
    method: 'PATCH',
    ...options,
  });
};

const appHttpDelete = <TData = any>(url: string, data?: any, options?: AdminHttpRequestOptions) => {
  return AdminHttpRequest<TData>({ url, data, method: 'DELETE', ...options });
};

const appHttpDownload = async (url: string, data?: any, options?: AdminHttpRequestOptions) => {
  const response = await AdminHttpRequestFile<File>({
    url,
    data,
    method: 'POST',
    responseType: 'blob',
    ...options,
  });

  try {
    let filename = '';
    const header: string = response.headers['content-disposition'];
    if (header != '') {
      console.log('header:' + header);
      const startIndex = header.indexOf('filename=');
      if (startIndex > 0) {
        const endIndex = header.lastIndexOf('; filename');
        if (endIndex > 0) {
          filename = header.replace('attachment; filename=', '');
        }
      }
    }
    console.log('filename:' + filename);

    const exportElement = document.createElement('a');
    exportElement.href = window.URL.createObjectURL(response.data);
    exportElement.download = decodeURI(filename.replace(/^\"|\"$/g, ''));
    exportElement.style.display = 'none';
    document.body.appendChild(exportElement);
    exportElement.click();
    document.body.removeChild(exportElement);
    window.URL.revokeObjectURL(exportElement.href);
  } catch (err) {
    throw err;
  }
};

const appHttpDownloadOds = async (url: string, data?: any, options?: AdminHttpRequestOptions) => {
  const response = await AdminHttpRequestFile<File>({
    url,
    data,
    method: 'POST',
    responseType: 'blob',
    ...options,
  });

  try {
    let filename = '';
    const header: string = response.headers['content-disposition'];
    if (header != '') {
      console.log('header:' + header);
      const startIndex = header.indexOf('filename=');
      if (startIndex > 0) {
        const endIndex = header.lastIndexOf('; filename');
        if (endIndex > 0) {
          filename = header.replace('attachment; filename=', '');
        }
      }
    }

    const XLSX = require('xlsx');

    (async () => {
      const url = window.URL.createObjectURL(response.data);
      const data = await (await fetch(url)).arrayBuffer();
      const workbook = XLSX.read(data);
      XLSX.writeFile(workbook, `${decodeURI(filename.replace('.xlsx', ''))}.ods`);
    })();
  } catch (err) {
    throw err;
  }
};

const appHttpPostReturnAll = <TData = any>(url: string, data?: any, options?: AdminHttpRequestOptions) => {
  return AdminHttpRequestFile<TData>({
    url,
    data,
    method: 'POST',
    ...options,
  });
};

AdminHttpRequest.get = appHttpGet;
AdminHttpRequest.post = appHttpPost;
AdminHttpRequest.put = appHttpPut;
AdminHttpRequest.patch = appHttpPatch;
AdminHttpRequest.delete = appHttpDelete;
AdminHttpRequest.download = appHttpDownload;
AdminHttpRequest.downloadOds = appHttpDownloadOds;
AdminHttpRequest.postReturnAll = appHttpPostReturnAll;
