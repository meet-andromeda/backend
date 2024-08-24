"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTopicStatement = {
    Effect: 'Allow',
    Action: [
        'SNS:CreateTopic',
    ],
    Resource: '*',
};
exports.default = createTopicStatement;
//# sourceMappingURL=create-topic-statement.js.map