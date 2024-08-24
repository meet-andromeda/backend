import { SQSRecord } from 'aws-lambda';
import EventWithWeb3Injection from '../types/event-with-web3-injection';

interface GetNetworkIdFromEventParams {
  event: EventWithWeb3Injection;
}

/**
 * Returns {networkId} if its present in the first record of an SNS event, or in the queryStrings
 *
 * @param {Event} event - The event to get the networkId from
 *
 */
function getNetworkIdFromEvent({
  event,
}: GetNetworkIdFromEventParams): number | undefined {
  if ('queryStringParameters' in event && event.queryStringParameters && 'networkId' in event.queryStringParameters) {
    const { queryStringParameters } = event;
    const { networkId } = queryStringParameters;
    return Number(networkId);
  }

  if ('Records' in event) {
    const { Records } = event;
    const record: SQSRecord = Records[0];
    const body = JSON.parse(record.body);

    if ('networkId' in body) {
      const { networkId } = body;
      return Number(networkId);
    }

    if ('metadata' in body) {
      const { metadata } = body;
      if ('networkId' in metadata) {
        const { networkId } = metadata;
        return Number(networkId);
      }
    }
  }

  if ('body' in event) {
    const { body } = event;
    const bodyRequest = JSON.parse(body);

    if ('networkId' in bodyRequest) {
      const { networkId } = bodyRequest;
      return Number(networkId);
    }
  }

  if ('networkId' in event) {
    const { networkId } = event;
    return networkId;
  }

  return undefined;
}

export default getNetworkIdFromEvent;
