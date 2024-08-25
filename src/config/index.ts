import commonEsbuildConfig from './common-esbuild-config';
import stage, { AllowedStage } from './stage';
import envVariablesNames from './env-variable-names';
import mongoConnection from './mongo-connection';

interface LoggerInterface {
  retentionDays: 1 | 3 | 5 | 7 | 14 | 30 | 60 | 90
  | 120 | 150 | 180 | 365 | 400 | 545 | 731 | 1827 | 3653;
  levelsByStage: Record<string, 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'>;
}

const region = process.env.REGION || 'us-east-1';
const logger: LoggerInterface = {
  retentionDays: stage === 'dev' ? 30 : 120,
  levelsByStage: {
    prod: 'info',
    staging: 'debug',
    dev: 'debug',
    testing: 'fatal',
    local: 'fatal',
  },
};

const enabledNetworks: number[] = [
  137, // Polygon
];

const serviceNames = {
  erc20: 'erc20',
  tenderly: 'tenderly',
  customSmartContract: 'custom-smart-contract',
  discord: 'discord',
  workflows: 'workflows',
  users: 'users',
  goplus: 'goplus',
};

const domain = {
  url: 'api.meetandromeda.com',
  enabled: true,
};

const config = {
  region,
  stage,
  logger,
  serviceNames,
  commonEsbuildConfig,
  enabledNetworks,
  domain,
  envVariablesNames,
  mongoConnection,
};

export type {
  AllowedStage,
  LoggerInterface,
};

export default config;
