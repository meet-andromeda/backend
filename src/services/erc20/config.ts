import generalConfig from '../../config';
import mongoConnection from '../../config/mongo-connection';

const {
  region,
  stage,
} = generalConfig;
const selectedDomain = generalConfig.domain;
const serviceName = generalConfig.serviceNames.erc20;

const profilesMongoUri = mongoConnection({
  stage,
  serviceName: generalConfig.serviceNames.users,
});

const config = {
  stage,
  selectedDomain,
  serviceName,
  logger: generalConfig.logger,
  region,
  profilesMongoUri,
};

export default config;
