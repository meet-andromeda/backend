import logger from '../../../logger';
import { invokeLambdaFunction } from '../../../../serverless/invoke-lambda';
import functionNames from '../function-names';

interface SendParams {
  destinationAddress: string;
  tokenAddress: string;
  tokenAmountInWei: string;
}

export async function send(params: SendParams): Promise<void> {
  try {
    const response = await invokeLambdaFunction<void>({
      functionName: functionNames.send,
      body: { ...params },
    });

    return response;
  } catch (error) {
    logger.error({
      name: 'erc20_send_failed',
      info: {},
      error,
    });
    throw error;
  }
}
