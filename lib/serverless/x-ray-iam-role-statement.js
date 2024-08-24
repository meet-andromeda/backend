"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xRayIamRoleStatement = {
    Effect: 'Allow',
    Action: [
        'xray:PutTraceSegments',
        'xray:PutTelemetryRecords',
    ],
    Resource: '*',
};
exports.default = xRayIamRoleStatement;
//# sourceMappingURL=x-ray-iam-role-statement.js.map