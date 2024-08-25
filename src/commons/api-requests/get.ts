import axios, {
  AxiosInstance,
  AxiosResponse,
} from 'axios';
import axiosErrorHandler from './axios-error-handler';

interface Response<T> {
  headers: Record<string, unknown>;
  data: T;
  retryRequestIfNecessary?: boolean;
}

/**
 * Generic get function using axios. Headers go inside options. If {retryRequestIfNecessary} is true,
 * axios will try to request again.
 *
 * @param url                     The complete url to be requested
 * @param options                 Headers and other options passed to axios
 * @param retryRequestIfNecessary If true, will retry the request
 *
 * @returns The api response
 */
async function get<T>(
  url: string,
  options?: Record<string, unknown>,
): Promise<Response<T>> {
  try {
    const api: AxiosInstance = axios.create();

    const response = await api
      .get<T, AxiosResponse<T>>(url, options);
    const { headers, data } = response;
    return { headers, data };
  } catch (error) {
    const {
      status,
      data,
    } = error.response;
    throw axiosErrorHandler({
      status,
      message: data,
    });
  }
}

export default get;
