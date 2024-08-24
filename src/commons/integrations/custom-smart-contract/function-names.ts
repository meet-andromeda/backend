import config from '../../../config';

const { stage } = config;
const functionNames = {
  write: `${config.serviceNames.customSmartContract}-${stage}-write`,
};

export default functionNames;
