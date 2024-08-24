import generalConfig from '../../config';

const {
  region,
  stage,
  mongoConnection,
} = generalConfig;
const selectedDomain = generalConfig.domain;
const serviceName = generalConfig.serviceNames.users;

const mongoUri = mongoConnection({
  stage,
  serviceName,
});

const circleWalletSetId = 'fd703dce-11ce-5ded-aee6-03e7571d2252';

const config = {
  stage,
  selectedDomain,
  serviceName,
  logger: generalConfig.logger,
  region,
  mongoUri,
  circleWalletSetId,
};

export default config;
