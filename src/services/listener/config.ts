import generalConfig, { AllowedStage } from '../../config';

const region = process.env.REGION || 'us-east-1';
const stage: AllowedStage = (process.env.STAGE as AllowedStage) || 'local';
const selectedDomain = generalConfig.domains[stage];

const serviceName = 'listener';

const slippagePercentageProportion = 0.005;
const suggestedIssuanceSmallBufferInWei = '10';
const zeroExContract = '0xdef1c0ded9bec7f1a1670819833240f027b25eff';

const config = {
  region,
  stage,
  selectedDomain,
  serviceName,
  logger: generalConfig.logger,
  slippagePercentageProportion,
  suggestedIssuanceSmallBufferInWei,
  zeroExContract,
};

export default config;
