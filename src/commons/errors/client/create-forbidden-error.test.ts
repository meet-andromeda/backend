import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import createForbiddenError from './create-forbidden-error';
import { FORBIDDEN_ERROR_MESSAGE } from './default-messages';

describe('createForbiddenError', () => {
  it('[SUCCESS] Should be a function', () => {
    expect(typeof createForbiddenError).to.equals('function');
  });

  it('[SUCCESS] Should return a forbidden error with a message in json format', () => {
    const message = 'message';

    const result = createForbiddenError(message);

    expect(result).to.exist;
    expect(result.message).to.equals(message);
    expect(result.statusCode).to.equals(StatusCodes.FORBIDDEN);
  });

  it('[SUCCESS] Should return a forbidden error with the default message in json format if none is supplied', () => {
    const result = createForbiddenError();

    expect(result).to.exist;
    expect(result.message).to.equals(FORBIDDEN_ERROR_MESSAGE);
    expect(result.statusCode).to.equals(StatusCodes.FORBIDDEN);
  });
});
