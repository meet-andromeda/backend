"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const domains_1 = require("./domains");
const common_esbuild_config_1 = __importDefault(require("./common-esbuild-config"));
const stage_1 = __importDefault(require("./stage"));
const env_variable_names_1 = __importDefault(require("./env-variable-names"));
const region = process.env.REGION || 'us-east-1';
const logger = {
    retentionDays: stage_1.default === 'dev' ? 30 : 120,
    levelsByStage: {
        prod: 'info',
        staging: 'debug',
        dev: 'debug',
        testing: 'fatal',
        local: 'fatal',
    },
};
const enabledNetworks = [
    137,
];
const serviceNames = {
    erc20: 'erc20',
    alchemy: 'alchemy',
    discord: 'discord',
};
const domain = {
    url: 'api.andromeda.com',
    enabled: true,
};
const config = {
    region,
    stage: stage_1.default,
    domains: domains_1.domains,
    logger,
    serviceNames,
    commonEsbuildConfig: common_esbuild_config_1.default,
    enabledNetworks,
    domain,
    envVariablesNames: env_variable_names_1.default,
};
exports.default = config;
//# sourceMappingURL=index.js.map