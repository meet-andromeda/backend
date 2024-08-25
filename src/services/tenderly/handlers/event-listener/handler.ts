import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { StatusCodes } from 'http-status-codes';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import { APIGatewayProxyEvent } from 'aws-lambda';
import addPostCors from '../../../../commons/middlewares/cors/add-post-cors';
import HandlerResponse from '../../../../types/handler-response';
import jsonTextPlainHttpResponseSerializer from '../../../../commons/middlewares/custom/json-text-plain-http-response-serializer';
import errorLogger from '../../../../commons/middlewares/custom/error-logger';
import { invokeLambdaFunction } from '../../../../serverless/invoke-lambda';

const middlewares = [
  addPostCors(),
  doNotWaitForEmptyEventLoop(),
  jsonTextPlainHttpResponseSerializer(),
  httpErrorHandler(),
  errorLogger(),
];

export const main = middy(async (event: APIGatewayProxyEvent): Promise<HandlerResponse> => {
  try {
    const body = JSON.parse(event.body);

    const {
      transaction: {
        hash,
      },
    } = body;

    await invokeLambdaFunction({
      functionName: 'workflows-dev-aleph',
      body: {
        transactionHash: hash,
        version: 'v1',
      },
    });
  } catch (error) {
    console.log('Error: ', error);
  }

  return {
    statusCode: StatusCodes.OK,
    body: {},
  };
}).use(middlewares);
