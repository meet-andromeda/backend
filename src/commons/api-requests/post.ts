import axios, { AxiosResponse } from 'axios';
import axiosErrorHandler from './axios-error-handler';

interface Response<TResponse> {
  headers: Record<string, unknown>;
  data: TResponse;
}

interface PostParams<TBody> {
  url: string;
  body: Record<string, unknown> | TBody;
  options: Record<string, unknown>;
}

/**
 * Generic post function using axios
 *
 * @param url The complete url to be requested
 * @param body Object with data to make the post
 * @param options Object with headers and method information
 *
 * @returns The api response
 */
async function post<TResponse, TBody = void>({
  url,
  body,
  options,
}: PostParams<TBody>): Promise<Response<TResponse>> {
  try {
    const response = await axios.post<TResponse, AxiosResponse<TResponse>>(
      url,
      body,
      options,
    );
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

export default post;
