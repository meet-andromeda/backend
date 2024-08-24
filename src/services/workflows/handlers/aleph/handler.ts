import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { StatusCodes } from 'http-status-codes';
import { APIGatewayProxyEvent } from 'aws-lambda';
import addPostCors from '../../../../commons/middlewares/cors/add-post-cors';
import HandlerResponse from '../../../../types/handler-response';

const middlewares = [
  addPostCors(),
  httpErrorHandler(),
];

export const main = middy(async (
  event: APIGatewayProxyEvent,
): Promise<HandlerResponse> => {
  const { body } = event;
  const requestBody = JSON.parse(body);

  return {
    statusCode: StatusCodes.OK,
    body: { ...requestBody },
  };
}).use(middlewares);
