"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s3IamRole = {
    Effect: 'Allow',
    Action: [
        's3:*',
    ],
    Resource: '*',
};
exports.default = s3IamRole;
//# sourceMappingURL=s3-iam-role-statement.js.map