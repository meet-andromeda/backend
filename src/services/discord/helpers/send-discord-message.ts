import post from '../../../commons/api-requests/post';
import Embed from '../types/embed';
import { objectToEmbed } from './object-to-embed';

interface SendDiscordMessageParams {
  url: string;
  title: string;
  params: Record<string, string | number>;
}

/**
 * Sends a message to a Discord channel
 *
 * @param title   Embedded message title
 * @param params  Arbitrary params to be parsed
 * @param url     Discord webhook url
 */
export async function sendDiscordMessage({
  title,
  params,
  url,
}: SendDiscordMessageParams): Promise<void> {
  if (!url) {
    return;
  }

  const embed: Embed = objectToEmbed({
    title,
    params: params ?? { body: 'empty params' },
  });

  const body = {
    message: 'Message',
    embeds: [embed],
  };

  await post<void>({
    url,
    body,
    options: {},
  });
}
