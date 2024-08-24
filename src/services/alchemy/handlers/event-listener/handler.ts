import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { StatusCodes } from 'http-status-codes';
import doNotWaitForEmptyEventLoop from '@middy/do-not-wait-for-empty-event-loop';
import { APIGatewayProxyEvent } from 'aws-lambda';
import addPostCors from '../../../../commons/middlewares/cors/add-post-cors';
import HandlerResponse from '../../../../types/handler-response';
import jsonTextPlainHttpResponseSerializer from '../../../../commons/middlewares/custom/json-text-plain-http-response-serializer';
import errorLogger from '../../../../commons/middlewares/custom/error-logger';

const middlewares = [
  addPostCors(),
  doNotWaitForEmptyEventLoop(),
  jsonTextPlainHttpResponseSerializer(),
  httpErrorHandler(),
  errorLogger(),
];

export const main = middy(async (event: APIGatewayProxyEvent): Promise<HandlerResponse> => {
  let body = JSON.parse(event.body);
  body = {
    transaction: {
      hash: '0x4c613158fc73b05b9b49959ea3b35ea35cb47cc3566f36118a65a4b38b221512',
      from: '0x3A3B58B71126dbF4DE982738ddE9878511e31fEF',
      to: '0xcEb923cFdf38eb05197B318162Da4c0431E19F8C',
      value: '0x0',
      logs: [
        {
          address: '0xec0Ed46f36576541C75739E915ADbCb3DE24bD77',
          topics: [Array],
          data: '0xa4791d5533c88b668dbc2fe17731b473b75386a4a04f370bc1c8c717aea1c612bc86dcd7575471f44c08e899e25b0f3ef0888d895c7aceb173f5663d2ad4153f000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000186a0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000002492fd1338000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000'
        },
        {
          address: '0xcEb923cFdf38eb05197B318162Da4c0431E19F8C',
          topics: [Array],
          data: '0xa4791d5533c88b668dbc2fe17731b473b75386a4a04f370bc1c8c717aea1c6120000000000000000000000000000000000000000000000000000000000000002',
        },
        {
          address: '0xcEb923cFdf38eb05197B318162Da4c0431E19F8C',
          topics: [Array],
          data: '0x0000000000000000000000003a3b58b71126dbf4de982738dde9878511e31fef000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000026e61000000000000000000000000000000000000000000000000000000000000',
        },
        {
          address: '0x0000000000000000000000000000000000001010',
          topics: [Array],
          data: '0x000000000000000000000000000000000000000000000000000f2317856701000000000000000000000000000000000000000000000000029a8359e2fb9b50da00000000000000000000000000000000000000000000003dd8503f6c781f20c80000000000000000000000000000000000000000000000029a7436cb76344fda00000000000000000000000000000000000000000000003dd85f6283fd8621c8',
        },
      ],
    },
  };
  const {
    transaction: {
      hash,
      from,
      to,
      value,
      logs,
    },
  } = body;

  console.log({
    hash,
    from,
    to,
    value,
    logs,
  });

  return {
    statusCode: StatusCodes.OK,
    body: {},
  };
}).use(middlewares);
