type AllowedStage = 'prod' | 'staging' | 'dev' | 'testing' | 'local';

const stage: AllowedStage = (process.env.STAGE as AllowedStage) || 'local';

export type {
  AllowedStage,
};
export default stage;
