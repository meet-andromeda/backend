import { isHttpError } from 'http-errors';
import { createInternalServerError } from '../../errors/server';
import logger from '../../logger';
import stringToSnakeCase from '../../../helpers/string-to-snake-case';

const errorLogger = (): {
  onError: (request: any) => Promise<void>;
} => {
  const errorLoggerOnError = async (request): Promise<void> => {
    if (!request.error) {
      return;
    }

    const error = isHttpError(request.error)
      ? request.error
      : createInternalServerError(request.error.message);

    logger.error({
      name: stringToSnakeCase(`${request.context.functionName}Error`),
      error,
    });

    request.error = JSON.stringify(error);
    request.response = {
      ...request.response,
      statusCode: error.statusCode,
      body: error,
    };
  };

  return {
    onError: errorLoggerOnError,
  };
};

export default errorLogger;
