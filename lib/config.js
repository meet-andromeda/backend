"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const region = process.env.REGION || 'us-east-1';
const logger = {
    retentionDays: 30,
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
};
const domain = {
    url: 'api.andromeda.com',
    enabled: true,
};
const stage = 'prod';
const config = {
    region,
    domain,
    logger,
    stage,
    serviceNames,
    enabledNetworks,
};
exports.default = config;
//# sourceMappingURL=config.js.map