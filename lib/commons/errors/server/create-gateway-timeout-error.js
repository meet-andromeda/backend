"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const default_messages_1 = require("./default-messages");
function createGatewayTimeoutError(message = default_messages_1.GATEWAY_TIMEOUT_ERROR_MESSAGE) {
    return (0, http_errors_1.default)(http_status_codes_1.StatusCodes.GATEWAY_TIMEOUT, message, {
        expose: true,
    });
}
exports.default = createGatewayTimeoutError;
//# sourceMappingURL=create-gateway-timeout-error.js.map