"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queueSubscriptionStatement = {
    Effect: 'Allow',
    Action: [
        'sqs:DeleteMessage',
        'sqs:GetQueueAttributes',
        'sqs:ReceiveMessage',
    ],
    Resource: '*',
};
exports.default = queueSubscriptionStatement;
//# sourceMappingURL=sqs-topic-statement.js.map