interface LoggerInterface {
  retentionDays: 1 | 3 | 5 | 7 | 14 | 30 | 60 | 90
  | 120 | 150 | 180 | 365 | 400 | 545 | 731 | 1827 | 3653;
  levelsByStage: Record<string, 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'>;
}
const region = process.env.REGION || 'us-east-1';
const logger: LoggerInterface = {
  retentionDays: 30,
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
};

const domain = {
  url: 'api.andromeda.com',
  enabled: true,
};

const stage = 'prod';

const config = {
  region,
  domain,
  logger,
  stage,
  serviceNames,
  enabledNetworks,
};

export default config;
