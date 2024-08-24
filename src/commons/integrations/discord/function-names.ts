import config from '../../../config';

const { stage } = config;
const functionNames = {
  sendMessage: `${config.serviceNames.discord}-${stage}-sendMessage`,
};

export default functionNames;
