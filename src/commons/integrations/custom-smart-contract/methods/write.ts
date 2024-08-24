import logger from '../../../logger';
import { invokeLambdaFunction } from '../../../../serverless/invoke-lambda';
import functionNames from '../function-names';

export async function write(): Promise<void> {
  try {
    const response = await invokeLambdaFunction<void>({
      functionName: functionNames.write,
    });

    return response;
  } catch (error) {
    logger.error({
      name: 'custom_smart_contract_write_failed',
      info: {},
      error,
    });
    throw error;
  }
}
