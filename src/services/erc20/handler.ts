import type { AWS } from '@serverless/typescript';
import { apiGatewayErrorsResources } from '../../serverless/resources';
import config from './config';
import { xRayIamRoleStatement } from '../../serverless';

const {
  stage,
  selectedDomain,
  serviceName,
  logger,
} = config;

const customDomain = {
  domainName: selectedDomain.url,
  basePath: serviceName,
  stage,
  createRoute53Record: true,
  enabled: selectedDomain.enabled,
};

const serverlessConfiguration: AWS = {
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
          xRayIamRoleStatement,
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
      ...apiGatewayErrorsResources,
    },
  },
};

module.exports = serverlessConfiguration;
