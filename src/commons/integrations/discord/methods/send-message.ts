import logger from '../../../logger';
import { invokeLambdaFunction } from '../../../../serverless/invoke-lambda';
import functionNames from '../function-names';

interface SendDiscordMessageParams {
  url: string;
  title: string;
  params: Record<string, string | number>;
}

export async function sendMessage(params: SendDiscordMessageParams): Promise<void> {
  try {
    const response = await invokeLambdaFunction<void>({
      functionName: functionNames.sendMessage,
      body: { ...params },
    });

    return response;
  } catch (error) {
    logger.error({
      name: 'discord_send_message_failed',
      info: {},
      error,
    });
    throw error;
  }
}
