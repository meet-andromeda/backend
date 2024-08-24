import middy from '@middy/core';
import ssm from '@middy/ssm';
import config from '../../../config';

/*
 * Loads all RPC providers api keys from SSM to the event context
 */
function loadBlockchainProviderKeysFromSsm(): middy.MiddlewareObj<
unknown,
unknown
> {
  const {
    alchemyApiKeyEthereum,
    alchemyApiKeyPolygon,
  } = config.envVariablesNames;

  const options = {
    fetchData: {
      [alchemyApiKeyEthereum]: '/backend/alchemy-api-key-ethereum',
      [alchemyApiKeyPolygon]: '/backend/alchemy-api-key-polygon',
    },
    setToContext: true,
    awsClientOptions: {
      region: config.region,
    },
    cacheKey: 'blockchain-provider-keys',
    cacheExpiry: 900000,
  };

  return ssm(options);
}

export default loadBlockchainProviderKeysFromSsm;
