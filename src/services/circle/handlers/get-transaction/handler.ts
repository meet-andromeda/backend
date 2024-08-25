import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { StatusCodes } from 'http-status-codes';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';
import addPostCors from '../../../../commons/middlewares/cors/add-post-cors';
import HandlerResponse from '../../../../types/handler-response';
import errorLogger from '../../../../commons/middlewares/custom/error-logger';
import jsonTextPlainHttpResponseSerializer from '../../../../commons/middlewares/custom/json-text-plain-http-response-serializer';
import envVariablesNames from '../../../../config/env-variable-names';
import loadValuesFromSsm from '../../../../commons/middlewares/ssm/load-values-from-ssm';

const {
  circleApiKey,
  circleEntitySecret,
} = envVariablesNames;

const middlewares = [
  addPostCors(),
  doNotWaitForEmptyEventLoop(),
  loadValuesFromSsm({
    params: [
      circleApiKey,
      circleEntitySecret,
    ],
  }),
  jsonTextPlainHttpResponseSerializer(),
  httpErrorHandler(),
  errorLogger(),
];

export const main = middy(async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<HandlerResponse> => {
  const { pathParameters } = event;

  const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
    apiKey: context[circleApiKey],
    entitySecret: context[circleEntitySecret],
  });

  const transactionInformation = await circleDeveloperSdk.getTransaction({
    id: pathParameters.transactionId,
  });

  return {
    statusCode: StatusCodes.OK,
    body: { hash: transactionInformation.data.transaction.txHash },
  };
}).use(middlewares);
