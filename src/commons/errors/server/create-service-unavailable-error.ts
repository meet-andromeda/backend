import createHttpError, { HttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { SERVICE_UNAVAILABLE_ERROR_MESSAGE } from './default-messages';

function createServiceUnavailableTimeoutError(
  message: string = SERVICE_UNAVAILABLE_ERROR_MESSAGE,
): HttpError {
  return createHttpError(
    StatusCodes.SERVICE_UNAVAILABLE,
    message,
    {
      expose: true,
    },
  );
}

export default createServiceUnavailableTimeoutError;
