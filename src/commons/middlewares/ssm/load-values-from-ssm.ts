import middy from '@middy/core';
import ssm from '@middy/ssm';
import config from '../../../config';

const { envVariablesNames } = config;
type Keys = keyof typeof envVariablesNames;
type EnvVariableName = typeof envVariablesNames[Keys];

interface LoadValuesFromSsmParams {
  params: EnvVariableName[];
}

const allParams: Record<EnvVariableName, string> = {
  [envVariablesNames.walletPrivateKey]: '/backend/wallet-private-key',
  [envVariablesNames.alchemyApiKeyEthereum]: '/backend/alchemy-api-key-ethereum',
  [envVariablesNames.alchemyApiKeyPolygon]: '/backend/alchemy-api-key-polygon',
  [envVariablesNames.infuraProjectId]: '/backend/infura-project-id',
} as const;

function loadValuesFromSsm({
  params,
}: LoadValuesFromSsmParams): middy.MiddlewareObj<unknown, unknown> {
  const fetchData = params.reduce(
    (accumulator, param) => ({
      ...accumulator,
      [param]: allParams[param] === 'undefined' ? undefined : allParams[param],
    }),
    {},
  );

  const options = {
    fetchData,
    setToContext: true,
    awsClientOptions: {
      region: config.region,
    },
  };

  return ssm(options);
}

export default loadValuesFromSsm;
export {
  allParams as ssmParameters,
};
