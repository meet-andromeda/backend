import { expect } from 'chai';
import { BadRequest, InternalServerError } from 'http-errors';
import isClientError from './is-client-error';

describe('isClientError', () => {
  it('[SUCCESS] Should be a function', () => {
    expect(typeof isClientError).to.equals('function');
  });

  it('[SUCCESS] Should return false if the error supplied is not a http error', () => {
    const error = new Error();

    const result = isClientError(error);

    expect(result).to.equals(false);
  });

  it('[SUCCESS] Should return true if the http error supplied has a 4xx status code', () => {
    const error = new BadRequest();

    const result = isClientError(error);

    expect(result).to.equals(true);
  });

  it('[SUCCESS] Should return false if the http error supplied does not have a 4xx status code', () => {
    const error = new InternalServerError();

    const result = isClientError(error);

    expect(result).to.equals(false);
  });
});
