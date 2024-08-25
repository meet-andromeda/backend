import generalConfig from '../../config';

const {
  region,
  stage,
} = generalConfig;

const selectedDomain = generalConfig.domain;
const serviceName = generalConfig.serviceNames.circle;

const config = {
  region,
  stage,
  selectedDomain,
  serviceName,
  logger: generalConfig.logger,
};

export default config;
