"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invokeFunctionStatement = {
    Effect: 'Allow',
    Action: [
        'lambda:InvokeFunction',
    ],
    Resource: '*',
};
exports.default = invokeFunctionStatement;
//# sourceMappingURL=invoke-function-statement.js.map