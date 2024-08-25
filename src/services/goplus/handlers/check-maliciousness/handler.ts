import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { StatusCodes } from 'http-status-codes';
import { APIGatewayProxyEvent } from 'aws-lambda';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import addPostCors from '../../../../commons/middlewares/cors/add-post-cors';
import HandlerResponse from '../../../../types/handler-response';
import errorLogger from '../../../../commons/middlewares/custom/error-logger';
import jsonTextPlainHttpResponseSerializer from '../../../../commons/middlewares/custom/json-text-plain-http-response-serializer';
import get from '../../../../commons/api-requests/get';
import { endpoints } from '../../constants';
import getQueryString from '../../../../commons/api-requests/url/get-query-string';
import objectKeysToSnakeCase from '../../../../helpers/object-keys-to-snake-case';
import { MaliciousnessResponse } from '../../types/maliciousness-result';
import { isAddressMalicious } from '../../helpers/is-address-malicious';
import buildUrlWithPathParams from '../../../../commons/api-requests/url/build-url-with-params';

const middlewares = [
  addPostCors(),
  doNotWaitForEmptyEventLoop(),
  jsonTextPlainHttpResponseSerializer(),
  httpErrorHandler(),
  errorLogger(),
];

export const main = middy(async (
  event: APIGatewayProxyEvent,
): Promise<HandlerResponse> => {
  const { body } = event;
  const requestBody = JSON.parse(body);

  const {
    networkId,
    address,
  } = requestBody;

  const url = buildUrlWithPathParams(endpoints.checkMaliciousness, {
    address,
  });
  const queryString = getQueryString(
    objectKeysToSnakeCase({
      chain_id: networkId,
    }),
  );
  const requestUrl = `${url}?${queryString}`;

  const checkerResponse = await get<MaliciousnessResponse>(requestUrl);
  const isMalicious = isAddressMalicious(checkerResponse.data);

  return {
    statusCode: StatusCodes.OK,
    body: { isMalicious },
  };
}).use(middlewares);
