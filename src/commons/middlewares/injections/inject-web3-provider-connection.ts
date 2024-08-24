/* eslint-disable no-param-reassign */
import middy from '@middy/core';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { AlchemyProvider } from '@ethersproject/providers';
import { createBadRequestError } from '../../errors/client';
import EventWithWeb3Injection from './types/event-with-web3-injection';
import getNetworkIdFromEvent from './helpers/get-network-id-from-event';
import getAlchemyApiKeyByNetworkId from './helpers/get-alchemy-api-key-by-network-id';

/**
 * Sets {provider} to the event. The provider is a fallback provider, will use three RPC providers in cascade if some of them fails
 *
 * @param {number} networkId - The networkId to connect to in case we want to set it manually
 *
 */
function injectWeb3ProviderConnection(networkId?: number):
middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> {
  const before
  : middy.MiddlewareFn<EventWithWeb3Injection, APIGatewayProxyResult> = async (request) => {
    const network = networkId ?? getNetworkIdFromEvent({ event: request.event });

    if (!network) {
      throw createBadRequestError('Missing or invalid networkId');
    }

    const alchemyApiKey = getAlchemyApiKeyByNetworkId({
      networkId: network,
    });

    const alchemyProvider = new AlchemyProvider(
      network,
      alchemyApiKey,
    );

    request.event.provider = alchemyProvider;
  };

  return {
    before,
  };
}

export default injectWeb3ProviderConnection;
