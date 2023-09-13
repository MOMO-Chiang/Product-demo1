import axios, { Method, AxiosResponse, AxiosError, ResponseType } from 'axios';

export type HttpMethod = Method;

export type HttpRequestOptions = {
  baseURL?: string;
  url?: string;
  method?: HttpMethod;
  headers?: any;
  timeout?: number;
  params?: any;
  data?: any;
  responseType?: ResponseType;
};

export type HttpResponse<T> = AxiosResponse<T>;

export type HttpRequestError<T = any, D = any> = AxiosError<T, D>;

export const httpRequest = async <TRespData = any>(options: HttpRequestOptions) => {
  try {
    const response = await axios({
      baseURL: options.baseURL,
      url: options.url,
      method: options.method,
      responseType: options.responseType || 'json',
      headers: options.headers,
      /*
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...options.headers,
      },
      */
      timeout: typeof options.timeout === 'undefined' ? options.timeout : 30000,
      params: options.params,
      data: options.data,
    });

    return response as HttpResponse<TRespData>;
  } catch (error) {
    throw error;
  }
};
