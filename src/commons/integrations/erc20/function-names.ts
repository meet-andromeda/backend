import config from '../../../config';

const { stage } = config;
const functionNames = {
  send: `${config.serviceNames.erc20}-${stage}-send`,
};

export default functionNames;
