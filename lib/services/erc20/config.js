"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const { region, stage, } = config_1.default;
const selectedDomain = config_1.default.domain;
const serviceName = config_1.default.serviceNames.erc20;
const config = {
    stage,
    selectedDomain,
    serviceName,
    logger: config_1.default.logger,
    region,
};
exports.default = config;
//# sourceMappingURL=config.js.map