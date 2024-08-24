import createHttpError, { HttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { BAD_GATEWAY_ERROR_MESSAGE } from './default-messages';

function createBadGatewayError(
  message: string = BAD_GATEWAY_ERROR_MESSAGE,
): HttpError {
  return createHttpError(
    StatusCodes.BAD_GATEWAY,
    message,
    {
      expose: true,
    },
  );
}

export default createBadGatewayError;
