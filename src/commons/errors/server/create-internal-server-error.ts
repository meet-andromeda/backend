import createHttpError, { HttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { INTERNAL_SERVER_ERROR_MESSAGE } from './default-messages';

function createInternalServerError(
  message: string = INTERNAL_SERVER_ERROR_MESSAGE,
): HttpError {
  const errorMessage = message && message !== 'Error'
    ? message
    : INTERNAL_SERVER_ERROR_MESSAGE;

  return createHttpError(
    StatusCodes.INTERNAL_SERVER_ERROR,
    errorMessage,
    {
      expose: true,
    },
  );
}

export default createInternalServerError;
