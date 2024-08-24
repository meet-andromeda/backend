"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parameterStoreStatement = {
    Effect: 'Allow',
    Action: [
        'ssm:GetParameters',
        'ssm:GetParameter',
        'ssm:PutParameter',
    ],
    Resource: '*',
};
exports.default = parameterStoreStatement;
//# sourceMappingURL=ssm-parameter-store.js.map