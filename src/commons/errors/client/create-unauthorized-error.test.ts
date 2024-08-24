import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import createUnauthorizedError from './create-unauthorized-error';
import { UNAUTHORIZED_ERROR_MESSAGE } from './default-messages';

describe('createUnauthorizedError', () => {
  it('[SUCCESS] Should be a function', () => {
    expect(typeof createUnauthorizedError).to.equals('function');
  });

  it('[SUCCESS] Should return an unauthorized error with a message in json format', () => {
    const message = 'message';

    const result = createUnauthorizedError(message);

    expect(result).to.exist;
    expect(result.message).to.equals(message);
    expect(result.statusCode).to.equals(StatusCodes.UNAUTHORIZED);
  });

  it('[SUCCESS] Should return an unauthorized error with the default message in json format if none is supplied', () => {
    const result = createUnauthorizedError();

    expect(result).to.exist;
    expect(result.message).to.equals(UNAUTHORIZED_ERROR_MESSAGE);
    expect(result.statusCode).to.equals(StatusCodes.UNAUTHORIZED);
  });
});
