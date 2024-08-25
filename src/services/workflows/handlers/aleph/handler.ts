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

interface AirdropTransactionResponse {
  hash: string;
}

export const main = middy(async (
  event: APIGatewayProxyEvent,
): Promise<HandlerResponse> => {
  const requestBody = JSON.parse(event.body);

  const { version, transactionHash } = requestBody;

  console.log('Version: ', version);
  console.log('Hash: ', transactionHash);

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

    // 1.5: Check Wallet
    const params15 = {
      address: txEvent.transactionEvent.userAddress,
      networkId: 137,
    };
    console.log('Params: ', params15);
    const checkMaliciousResponse = await invokeLambdaFunction<DecodeEventResponse>({
      functionName: 'goplus-dev-checkMaliciousness',
      body: {
        ...params15,
      },
    });
    console.log('Malicious: ', checkMaliciousResponse);

    // 2: Mint And Airdrop
    const params2 = {
      ...v1.actions[1].params,
      abiFunctionParameters: [
        txEvent.transactionEvent.userAddress,
        Date.now(),
      ],
    };
    console.log('Params: ', params2);
    const airdropTransaction = await invokeLambdaFunction<AirdropTransactionResponse>({
      functionName: 'custom-smart-contract-dev-write',
      body: {
        ...params2,
      },
    });
    console.log('AirdropTransactionResponse: ', airdropTransaction);

    // 4: Send Discord Message
    const params4 = {
      ...v1.actions[3].params,
      params: {
        'Airdrop Sent To': txEvent.transactionEvent.userAddress,
        'Airdrop Hash': airdropTransaction.hash,
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
