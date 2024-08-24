const setTopicAttributesStatement = {
  Effect: 'Allow',
  Action: [
    'SNS:SetTopicAttributes',
  ],
  Resource: '*',
};

export default setTopicAttributesStatement;
