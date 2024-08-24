import logger from '../../../logger';
import { invokeLambdaFunction } from '../../../../serverless/invoke-lambda';
import functionNames from '../function-names';

export async function aleph(): Promise<void> {
  try {
    const response = await invokeLambdaFunction<void>({
      functionName: functionNames.aleph,
      body: {},
    });

    return response;
  } catch (error) {
    logger.error({
      name: 'workflows_aleph_failed',
      info: {},
      error,
    });
    throw error;
  }
}
