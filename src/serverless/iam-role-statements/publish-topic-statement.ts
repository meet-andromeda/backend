const publishTopicStatement = {
  Effect: 'Allow',
  Action: [
    'SNS:Publish',
  ],
  Resource: '*',
};

export default publishTopicStatement;
