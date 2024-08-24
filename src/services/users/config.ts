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
console.log({
  mongoUri,
});

const config = {
  stage,
  selectedDomain,
  serviceName,
  logger: generalConfig.logger,
  region,
  mongoUri,
};

export default config;
