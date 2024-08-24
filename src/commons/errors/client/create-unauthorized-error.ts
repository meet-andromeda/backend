import { HttpError, Unauthorized } from 'http-errors';
import { UNAUTHORIZED_ERROR_MESSAGE } from './default-messages';

function createUnauthorizedError(
  message: string = UNAUTHORIZED_ERROR_MESSAGE,
): HttpError {
  return new Unauthorized(message);
}

export default createUnauthorizedError;
