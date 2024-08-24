import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import createNotFoundError from './create-not-found-error';
import { NOT_FOUND_ERROR_MESSAGE } from './default-messages';

describe('createNotFoundError', () => {
  it('[SUCCESS] Should be a function', () => {
    expect(typeof createNotFoundError).to.equals('function');
  });

  it('[SUCCESS] Should return a not found error with a message in json format', () => {
    const message = 'message';
    const result = createNotFoundError(message);

    expect(result).to.exist;
    expect(result.message).to.equals(message);
    expect(result.statusCode).to.equals(StatusCodes.NOT_FOUND);
  });

  it('[SUCCESS] Should return a not found error with the default message in json format if none is supplied', () => {
    const result = createNotFoundError();

    expect(result).to.exist;
    expect(result.message).to.equals(NOT_FOUND_ERROR_MESSAGE);
    expect(result.statusCode).to.equals(StatusCodes.NOT_FOUND);
  });
});
