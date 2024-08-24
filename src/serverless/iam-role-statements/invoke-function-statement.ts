const invokeFunctionStatement = {
  Effect: 'Allow',
  Action: [
    'lambda:InvokeFunction',
  ],
  Resource: '*',
};

export default invokeFunctionStatement;
