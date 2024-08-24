import generalConfig from '../../config';

const {
  region,
  stage,
} = generalConfig;
const selectedDomain = generalConfig.domain;
const serviceName = generalConfig.serviceNames.erc20;

const config = {
  stage,
  selectedDomain,
  serviceName,
  logger: generalConfig.logger,
  region,
};

export default config;
