import { HttpError } from 'http-errors';

function isServerError(error: Error): boolean {
  if (error instanceof HttpError) {
    return error.statusCode.toString().startsWith('5');
  }

  return false;
}

export default isServerError;
