import type { AWS } from '@serverless/typescript';
import {
  xRayIamRoleStatement,
  parameterStoreStatement,
} from '../../serverless/iam-role-statements';
import apiGatewayErrorsResources from '../../serverless/resources/api-gateway-errors';
import config from './config';
import * as functions from './handlers';

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
          xRayIamRoleStatement,
          parameterStoreStatement,
        ],
      },
    },
  },
  functions,
  resources: {
    Resources: {
      ...apiGatewayErrorsResources,
    },
  },
};

module.exports = serverlessConfiguration;
