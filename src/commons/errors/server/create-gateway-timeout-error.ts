import createHttpError, { HttpError } from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { GATEWAY_TIMEOUT_ERROR_MESSAGE } from './default-messages';

function createGatewayTimeoutError(
  message: string = GATEWAY_TIMEOUT_ERROR_MESSAGE,
): HttpError {
  return createHttpError(
    StatusCodes.GATEWAY_TIMEOUT,
    message,
    {
      expose: true,
    },
  );
}

export default createGatewayTimeoutError;
