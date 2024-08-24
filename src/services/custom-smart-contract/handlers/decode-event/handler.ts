import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { StatusCodes } from 'http-status-codes';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import { AlchemyProvider } from '@ethersproject/providers';
import addPostCors from '../../../../commons/middlewares/cors/add-post-cors';
import HandlerResponse from '../../../../types/handler-response';
import jsonTextPlainHttpResponseSerializer from '../../../../commons/middlewares/custom/json-text-plain-http-response-serializer';
import errorLogger from '../../../../commons/middlewares/custom/error-logger';
import { decodeEventFromTransaction } from '../../actions/decode-event';
import loadValuesFromSsm from '../../../../commons/middlewares/ssm/load-values-from-ssm';
import envVariablesNames from '../../../../config/env-variable-names';

const middlewares = [
  addPostCors(),
  loadValuesFromSsm({
    params: [
      envVariablesNames.alchemyApiKeyPolygon,
    ],
  }),
  doNotWaitForEmptyEventLoop(),
  jsonTextPlainHttpResponseSerializer(),
  httpErrorHandler(),
  errorLogger(),
];

export const main = middy(async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<HandlerResponse> => {
  const bodyRequest = JSON.parse(event.body);

  console.log('Body Request: ', bodyRequest);

  const alchemyProvider = new AlchemyProvider(
    137,
    context[envVariablesNames.alchemyApiKeyPolygon],
  );

  // TODO! Implement the logic to call the write function
  const txEvent = await decodeEventFromTransaction({
    ...bodyRequest,
    provider: alchemyProvider,
  });

  return {
    statusCode: StatusCodes.OK,
    body: { transactionEvent: txEvent },
  };
}).use(middlewares);
