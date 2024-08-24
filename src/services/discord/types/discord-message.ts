import Embed from './embed';

interface DiscordMessage {
  message: string;
  embeds: Embed[];
}

export default DiscordMessage;
