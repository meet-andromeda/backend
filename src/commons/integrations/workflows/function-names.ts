import config from '../../../config';

const { stage } = config;
const functionNames = {
  aleph: `${config.serviceNames.workflows}-${stage}-aleph`,
};

export default functionNames;
