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

interface DecodeEventResponse {
  transactionEvent: {
    userAddress: string;
    solanaAddress: string;
  }
}

export const main = middy(async (
  event: APIGatewayProxyEvent,
): Promise<HandlerResponse> => {
  const requestBody = JSON.parse(event.body);

  const { version, transactionHash } = requestBody;

  if (version === 'v1') {
    // 1: Decode Event
    const params1 = {
      ...v1.actions[0].params,
      transactionHash,
    };
    console.log('Params: ', params1);
    const txEvent = await invokeLambdaFunction<DecodeEventResponse>({
      functionName: 'custom-smart-contract-dev-decodeEvent',
      body: {
        ...params1,
      },
    });
    console.log('Decoded Event: ', txEvent);

    // 4: Send Discord Message
    const params4 = {
      ...v1.actions[3].params,
      params: {
        'Airdrop Sent To': txEvent.transactionEvent.userAddress,
      },
    };
    console.log('Params: ', params4);
    const message = await invokeLambdaFunction({
      functionName: 'discord-dev-sendMessage',
      body: {
        ...params4,
      },
    });
    console.log('Discord Message: ', message);
  }

  return {
    statusCode: StatusCodes.OK,
    body: requestBody,
  };
}).use(middlewares);
