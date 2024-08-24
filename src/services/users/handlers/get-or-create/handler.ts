import { APIGatewayProxyEvent } from 'aws-lambda';
import middy from '@middy/core';
import { StatusCodes } from 'http-status-codes';
import httpErrorHandler from '@middy/http-error-handler';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import config from '../../config';
import addGetCors from '../../../../commons/middlewares/cors/add-get-cors';
import injectDatabaseConnection from '../../../../commons/middlewares/injections/inject-database-connection';
import HandlerResponse from '../../../../types/handler-response';
import { getOrCreate } from '../../actions/get-or-create';
import jsonTextPlainHttpResponseSerializer from '../../../../commons/middlewares/custom/json-text-plain-http-response-serializer';
import errorLogger from '../../../../commons/middlewares/custom/error-logger';

const middlewares = [
  addGetCors(),
  doNotWaitForEmptyEventLoop(),
  injectDatabaseConnection({ uri: config.mongoUri }),
  jsonTextPlainHttpResponseSerializer(),
  httpErrorHandler(),
  errorLogger(),
];

export const main = middy(async (
  event: APIGatewayProxyEvent,
): Promise<HandlerResponse> => {
  const {
    pathParameters,
  } = event;

  const userInformation = await getOrCreate({
    userAddress: pathParameters.userAddress,
  });

  return {
    statusCode: StatusCodes.OK,
    body: userInformation,
  };
}).use(middlewares);
