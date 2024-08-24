import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { StatusCodes } from 'http-status-codes';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import { APIGatewayProxyEvent } from 'aws-lambda';
import addPostCors from '../../../../commons/middlewares/cors/add-post-cors';
import HandlerResponse from '../../../../types/handler-response';
import jsonTextPlainHttpResponseSerializer from '../../../../commons/middlewares/custom/json-text-plain-http-response-serializer';
import errorLogger from '../../../../commons/middlewares/custom/error-logger';

const middlewares = [
  addPostCors(),
  doNotWaitForEmptyEventLoop(),
  jsonTextPlainHttpResponseSerializer(),
  httpErrorHandler(),
  errorLogger(),
];

export const main = middy(async (event: APIGatewayProxyEvent): Promise<HandlerResponse> => {
  const body = JSON.parse(event.body);

  const {
    transaction: {
      hash,
      from,
      to,
      value,
      logs,
    },
  } = body;

  console.log({
    hash,
    from,
    to,
    value,
    logs,
  });

  return {
    statusCode: StatusCodes.OK,
    body: {},
  };
}).use(middlewares);
