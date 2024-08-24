const queueSubscriptionStatement = {
  Effect: 'Allow',
  Action: [
    'sqs:DeleteMessage',
    'sqs:GetQueueAttributes',
    'sqs:ReceiveMessage',
  ],
  Resource: '*',
};

export default queueSubscriptionStatement;
