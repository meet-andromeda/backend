import { APIGatewayProxyEvent } from 'aws-lambda';
import middy from '@middy/core';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import addGetCors from '../../../../commons/middlewares/cors/add-get-cors';
import injectDatabaseConnection from '../../../../commons/middlewares/injections/inject-database-connection';
import HandlerResponse from '../../../../types/handler-response';
import { getOrCreate } from '../../actions/get-or-create';

const middlewares = [
  addGetCors(),
  injectDatabaseConnection({ uri: config.mongoUri }),
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
