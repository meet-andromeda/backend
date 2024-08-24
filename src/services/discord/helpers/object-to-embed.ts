import Embed from '../types/embed';

interface ObjectToEmbedParams {
  title: string;
  params: Record<string, string | number>;
}

const discordMessageBlueColor = 4237823;

/**
 * Parses arbitrary params to a Discord Embed, that used to push a notfication
 * afterwards. If a param is not a string, or a number, or is null or undefined,
 * it will be parsed as 'undefined'.
 *
 * @param title   Embedded message title
 * @param params  Arbitrary params to be parsed
 *
 * @returns An embedded parsed object that will be used in a notification
 */
export function objectToEmbed({
  title,
  params,
}: ObjectToEmbedParams): Embed {
  const keys = Object.keys(params);
  const fields = keys.map((key) => {
    if (!params[key]
      || !(typeof params[key] !== 'string'
      || typeof params[key] !== 'number')) {
      return {
        name: key,
        value: 'undefined',
      };
    }
    const valueAsString = params[key].toString();

    return ({
      name: key,
      value: valueAsString.length > 500
        ? valueAsString.substring(0, 500)
        : valueAsString,
    });
  });
  return {
    title,
    color: discordMessageBlueColor,
    fields,
  };
}
