import { expect } from 'chai';
import createBadRequestError from './create-bad-request-error';
import { errorReasons } from '../constants';

const badRequestErrorMessage = 'The server could not understand the request';
const statusCode = 400;

describe('createBadRequestError', () => {
  it('[SUCCESS] Should be a function', () => {
    expect(typeof createBadRequestError).to.equals('function');
  });

  it('[SUCCESS] Should return a bad request error with a message', () => {
    const message = 'message';

    const result = createBadRequestError(message);

    expect(result).to.exist;
    expect(result.message).to.equals(message);
    expect(result.statusCode).to.equals(statusCode);
  });

  it('[SUCCESS] Should return a bad request error object with a message and additional information', () => {
    const error = { message: 'message', reason: errorReasons.emailAlreadyUsed };

    const result = createBadRequestError(error);

    expect(result).to.exist;
    expect(result.message).to.equals(error.message);
    expect(result.reason).to.equals(error.reason);
    expect(result.statusCode).to.equals(statusCode);
  });

  it('[SUCCESS] Should return a bad request error object with a default message and additional information', () => {
    const error = { reason: errorReasons.emailAlreadyUsed };

    const result = createBadRequestError(error);

    expect(result).to.exist;
    expect(result.message).to.equals(badRequestErrorMessage);
    expect(result.reason).to.equals(error.reason);
    expect(result.statusCode).to.equals(statusCode);
  });

  it('[SUCCESS] Should return a bad request error with the default message if none is supplied', () => {
    const result = createBadRequestError();

    expect(result).to.exist;
    expect(result.message).to.equals(badRequestErrorMessage);
    expect(result.statusCode).to.equals(statusCode);
  });
});
