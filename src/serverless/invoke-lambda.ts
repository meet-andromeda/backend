import {
  LambdaClient,
  InvokeCommand,
  InvocationType,
} from '@aws-sdk/client-lambda';
import { InvokeLambdaEvent } from './types/invoke-lambda-event';
import config from '../config';
import logger from '../commons/logger';
import { createInternalServerError } from '../commons/errors/server';

function isSuccessfulResponse(statusCode: number): boolean {
  return (statusCode >= 200 && statusCode < 300);
}

interface InvokeLambdaFunctionParams {
  functionName: string,
  headers?: Record<string, unknown>;
  body?: Record<string, unknown>;
  pathParameters?: { [name: string]: string | number | undefined },
  queryStringParameters?: Record<string, any>;
}

async function invokeLambdaFunction<T>({
  functionName,
  headers,
  body,
  pathParameters,
  queryStringParameters,
}: InvokeLambdaFunctionParams): Promise<T> {
  try {
    const payload: InvokeLambdaEvent = {
      headers: JSON.stringify(headers),
      body: JSON.stringify(body),
      pathParameters,
      queryStringParameters,
    };
    const params = {
      FunctionName: functionName,
      InvocationType: 'RequestResponse' as InvocationType,
      Payload: Buffer.from(JSON.stringify(payload)),
    };
    const lambda = new LambdaClient({
      region: config.region,
    });
    const command = new InvokeCommand(params);
    const response = await lambda.send(command);
    const responsePayload = JSON.parse(Buffer.from(response.Payload).toString());
    if (!isSuccessfulResponse(responsePayload.statusCode)) {
      throw createInternalServerError('There was an error processing the request');
    }
    logger.info({
      name: 'invoke_lambda_function_successful',
      info: {
        params: {
          ...params,
          stage: config.stage,
          Payload: payload,
        },
      },
    });
    const responseBody: T = JSON.parse(responsePayload.body);
    return responseBody;
  } catch (error) {
    logger.error({
      name: 'invoke_lambda_function_failed',
      info: {
        stage: config.stage,
        functionName,
        body,
        pathParameters,
        queryStringParameters,
        errorMessage: error?.message ?? '',
      },
    });
    throw error;
  }
}

export { invokeLambdaFunction };
