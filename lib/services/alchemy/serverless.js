"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iam_role_statements_1 = require("../../serverless/iam-role-statements");
const index_1 = __importDefault(require("./index"));
const api_gateway_errors_1 = __importDefault(require("../../serverless/resources/api-gateway-errors"));
const config_1 = __importDefault(require("./config"));
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
                    iam_role_statements_1.invokeFunctionStatement,
                ],
            },
        },
    },
    functions: {
        eventListener: index_1.default,
    },
    resources: {
        Resources: {
            ...api_gateway_errors_1.default,
        },
    },
};
module.exports = serverlessConfiguration;
//# sourceMappingURL=serverless.js.map