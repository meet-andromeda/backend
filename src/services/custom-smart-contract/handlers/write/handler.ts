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
import User from '../../../users/model';
import injectDatabaseConnection from '../../../../commons/middlewares/injections/inject-database-connection';
import config from '../../config';

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
  injectDatabaseConnection({ uri: config.profilesMongoUri }),
  jsonTextPlainHttpResponseSerializer(),
  httpErrorHandler(),
  errorLogger(),
];

export const main = middy(async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<HandlerResponse> => {
  try {
    const { body } = event;
    const requestBody = JSON.parse(body);

    const {
      userAddress,
      contractAddress,
      abiFunctionSignature,
      abiFunctionParameters,
    } = requestBody;

    const userInformation = await User.get({
      filter: { userAddress: userAddress.toLowerCase() },
    });
    const wallet = Object.values(userInformation.wallets)[0];

    const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
      apiKey: context[circleApiKey],
      entitySecret: context[circleEntitySecret],
    });

    const params = {
      walletId: wallet.id,
      contractAddress,
      abiFunctionSignature,
      abiParameters: abiFunctionParameters,
      fee: {
        type: 'level',
        config: {
          feeLevel: 'HIGH',
        },
      },
    };

    console.log('Wallet: ', params);

    const executeTransactionResponse = await circleDeveloperSdk.createContractExecutionTransaction({
      walletId: wallet.id,
      contractAddress,
      abiFunctionSignature,
      abiParameters: abiFunctionParameters,
      fee: {
        type: 'level',
        config: {
          feeLevel: 'HIGH',
        },
      },
    });

    console.log(executeTransactionResponse);

    return {
      statusCode: StatusCodes.OK,
      body: { transactionId: executeTransactionResponse.data.id },
    };
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}).use(middlewares);
