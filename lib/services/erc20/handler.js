"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverless_1 = require("../../serverless");
const config_1 = __importDefault(require("./config"));
const { stage, selectedDomain, serviceName, } = config_1.default;
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
        vpcConfig: {
            enabled: true,
            cidrBlock: '10.15.0.0/16',
            createNatGateway: 2,
            createNetworkAcl: true,
            createDbSubnet: false,
            createFlowLogs: false,
            zones: ['us-east-1a', 'us-east-1b'],
        },
    },
    plugins: [
        'serverless-domain-manager',
        'serverless-esbuild',
        'serverless-offline',
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
        tracing: {
            apiGateway: true,
            lambda: true,
        },
        iam: {
            role: {
                statements: [
                    serverless_1.xRayIamRoleStatement,
                ],
            },
        },
        tags: {
            service: serviceName,
            env: stage,
        },
    },
    functions: {},
    resources: {
        Resources: {
            ...serverless_1.apiGatewayErrorsResources,
        },
    },
};
exports.default = serverlessConfiguration;
//# sourceMappingURL=handler.js.map