const parameterStoreStatement = {
  Effect: 'Allow',
  Action: [
    'ssm:GetParameters',
    'ssm:GetParameter',
    'ssm:PutParameter',
  ],
  Resource: '*',
};

export default parameterStoreStatement;
