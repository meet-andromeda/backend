import generalConfig from '../../config';
import mongoConnection from '../../config/mongo-connection';

const {
  region,
  stage,
} = generalConfig;

const selectedDomain = generalConfig.domain;
const serviceName = generalConfig.serviceNames.customSmartContract;

const profilesMongoUri = mongoConnection({
  stage,
  serviceName: generalConfig.serviceNames.users,
});

const config = {
  region,
  stage,
  selectedDomain,
  serviceName,
  logger: generalConfig.logger,
  profilesMongoUri,
};

export default config;
