import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { StatusCodes } from 'http-status-codes';
import { APIGatewayProxyEvent } from 'aws-lambda';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import addPostCors from '../../../../commons/middlewares/cors/add-post-cors';
import HandlerResponse from '../../../../types/handler-response';
import jsonTextPlainHttpResponseSerializer from '../../../../commons/middlewares/custom/json-text-plain-http-response-serializer';
import errorLogger from '../../../../commons/middlewares/custom/error-logger';
import { invokeLambdaFunction } from '../../../../serverless/invoke-lambda';
import { v1 } from './v1';

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
  const requestBody = JSON.parse(event.body);

  const { version, transactionHash } = requestBody;

  console.log('Version: ', version);
  console.log('Hash: ', transactionHash);

  if (version === 'v1') {
    const params = {
      ...v1.actions[0].params,
      transactionHash,
    };

    console.log('Params: ', params);
    await invokeLambdaFunction({
      functionName: 'custom-smart-contract-dev-decodeEvent',
      body: {
        ...params,
      },
    });
  }

  return {
    statusCode: StatusCodes.OK,
    body: requestBody,
  };
}).use(middlewares);
