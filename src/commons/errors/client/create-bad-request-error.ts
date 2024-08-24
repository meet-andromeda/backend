import createHttpError, { HttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { BAD_REQUEST_ERROR_MESSAGE } from './default-messages';
import { ErrorReason } from '../types';

interface ExtendedHttpError {
  reason: ErrorReason;
  message?: string;
}

type ErrorOrMessage = string | ExtendedHttpError;

function createBadRequestError(
  errorOrMessage: ErrorOrMessage = BAD_REQUEST_ERROR_MESSAGE,
): HttpError {
  const body = typeof errorOrMessage === 'string'
    ? errorOrMessage
    : {
      ...errorOrMessage,
      message: errorOrMessage.message ?? BAD_REQUEST_ERROR_MESSAGE,
    };

  return createHttpError(StatusCodes.BAD_REQUEST, body);
}

export default createBadRequestError;
