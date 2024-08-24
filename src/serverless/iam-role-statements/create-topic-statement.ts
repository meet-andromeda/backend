const createTopicStatement = {
  Effect: 'Allow',
  Action: [
    'SNS:CreateTopic',
  ],
  Resource: '*',
};

export default createTopicStatement;
