"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const publishTopicStatement = {
    Effect: 'Allow',
    Action: [
        'SNS:Publish',
    ],
    Resource: '*',
};
exports.default = publishTopicStatement;
//# sourceMappingURL=publish-topic-statement.js.map