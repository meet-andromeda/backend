import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { StatusCodes } from 'http-status-codes';
import { APIGatewayProxyEvent } from 'aws-lambda';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import addPostCors from '../../../../commons/middlewares/cors/add-post-cors';
import HandlerResponse from '../../../../types/handler-response';
import write from '../../actions/write';
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
  const bodyRequest = JSON.parse(event.body);

  // TODO! Implement the logic to call the write function
  const receipt = await write(bodyRequest);

  return {
    statusCode: StatusCodes.OK,
    body: { transactionHash: receipt.hash },
  };
}).use(middlewares);
