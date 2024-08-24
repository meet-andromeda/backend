import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { StatusCodes } from 'http-status-codes';
import addPostCors from '../../../../commons/middlewares/cors/add-post-cors';
import HandlerResponse from '../../../../types/handler-response';

const middlewares = [
  addPostCors(),
  httpErrorHandler(),
];

export const main = middy(async (): Promise<HandlerResponse> => ({
  statusCode: StatusCodes.OK,
  body: {},
})).use(middlewares);
