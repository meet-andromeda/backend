const getTopicAttributesStatement = {
  Effect: 'Allow',
  Action: [
    'SNS:GetTopicAttributes',
  ],
  Resource: '*',
};

export default getTopicAttributesStatement;
