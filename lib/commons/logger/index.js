"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = require("pino");
const config_1 = __importDefault(require("../../config"));
class Logger {
    constructor() {
        this.logger = Logger.createLogger();
    }
    static createLogger() {
        const level = config_1.default.logger.levelsByStage[config_1.default.stage];
        const transport = config_1.default.stage === 'local' ? {
            target: 'pino-pretty',
        } : undefined;
        const options = {
            level,
            messageKey: 'name',
            timestamp: true,
            formatters: {
                level(label) {
                    return { level: label };
                },
            },
            transport,
        };
        return (0, pino_1.pino)(options);
    }
    info({ name, info, }) {
        this.logger.info({ info }, name);
    }
    error({ name, error, info, }) {
        this.logger.error({
            error,
            info,
        }, name);
    }
    debug({ name, info, }) {
        this.logger.debug({ info }, name);
    }
    warning({ name, info, }) {
        this.logger.warn({ info }, name);
    }
    fatal({ name, error, info, }) {
        this.logger.fatal({
            error,
            info,
        }, name);
    }
    attachRequestId({ requestId }) {
        if (!this.logger) {
            this.logger = Logger.createLogger();
        }
        const loggerBindings = this.logger.bindings;
        if (!loggerBindings.requestId) {
            this.logger = this.logger.child({
                requestId,
            });
        }
    }
}
exports.default = new Logger();
//# sourceMappingURL=index.js.map