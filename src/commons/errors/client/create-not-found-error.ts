import { HttpError, NotFound } from 'http-errors';
import { NOT_FOUND_ERROR_MESSAGE } from './default-messages';

function createNotFoundError(
  message: string = NOT_FOUND_ERROR_MESSAGE,
): HttpError {
  return new NotFound(message);
}

export default createNotFoundError;
