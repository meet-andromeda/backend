import { HttpError } from 'http-errors';
import { createBadRequestError } from '../errors/client';
import { createInternalServerError } from '../errors/server';

/**
 * Generic error handler function for axios responses
 *
 * @param error The error captured in an axios request, type AxiosError
 * @throws The correspondent error
 */

interface CodeMessage {
  status: number,
  message: string,
}

function axiosErrorHandler({
  status,
  message,
}: CodeMessage): HttpError {
  if (status.toString()[0] === '4') {
    return createBadRequestError(message);
  }
  return createInternalServerError(message);
}

export default axiosErrorHandler;
