import { HttpError } from 'http-errors';

function isClientError(error: Error): boolean {
  if (error instanceof HttpError) {
    return error.statusCode.toString().startsWith('4');
  }

  return false;
}

export default isClientError;
