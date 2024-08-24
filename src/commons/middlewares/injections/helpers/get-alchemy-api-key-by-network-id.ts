import config from '../../../../config';

interface GetAlchemyApiKeyByNetworkIdParams {
  networkId: number;
}

const {
  alchemyApiKeyEthereum,
  alchemyApiKeyPolygon,
} = config.envVariablesNames;

/**
 * Returns the env variable name of Alchemy's API key by network
 * @param networkId Blockchain networkId
 * @returns Env variable name of Alchemy api key
 */
function getAlchemyApiKeyByNetworkId({
  networkId,
}: GetAlchemyApiKeyByNetworkIdParams): string {
  switch (networkId) {
    case 1:
      return alchemyApiKeyEthereum;
    default:
      return alchemyApiKeyPolygon;
  }
}

export default getAlchemyApiKeyByNetworkId;
