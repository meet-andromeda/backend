"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iam_role_statements_1 = require("../../serverless/iam-role-statements");
const api_gateway_errors_1 = __importDefault(require("../../serverless/resources/api-gateway-errors"));
const config_1 = __importDefault(require("./config"));
const functions = __importStar(require("./handlers"));
const { stage, selectedDomain, serviceName, logger, } = config_1.default;
const customDomain = {
    domainName: selectedDomain.url,
    basePath: serviceName,
    stage,
    createRoute53Record: true,
    enabled: selectedDomain.enabled,
};
const serverlessConfiguration = {
    service: serviceName,
    frameworkVersion: '3',
    custom: {
        customDomain,
        prune: {
            automatic: true,
            number: 5,
        },
    },
    plugins: [
        'serverless-domain-manager',
        'serverless-esbuild',
    ],
    package: {
        individually: true,
    },
    provider: {
        name: 'aws',
        runtime: 'nodejs18.x',
        stage,
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            STAGE: stage,
        },
        logRetentionInDays: logger.retentionDays,
        tracing: {
            apiGateway: true,
            lambda: true,
        },
        iam: {
            role: {
                statements: [
                    iam_role_statements_1.xRayIamRoleStatement,
                    iam_role_statements_1.parameterStoreStatement,
                    iam_role_statements_1.invokeFunctionStatement,
                ],
            },
        },
    },
    functions,
    resources: {
        Resources: {
            ...api_gateway_errors_1.default,
        },
    },
};
module.exports = serverlessConfiguration;
//# sourceMappingURL=serverless.js.map