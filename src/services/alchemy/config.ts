import generalConfig from '../../config';

const {
  region,
  stage,
} = generalConfig;
const selectedDomain = generalConfig.domain;
const serviceName = generalConfig.serviceNames.alchemy;

const config = {
  region,
  stage,
  selectedDomain,
  serviceName,
  logger: generalConfig.logger,
};

export default config;
