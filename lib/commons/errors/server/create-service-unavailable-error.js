"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const default_messages_1 = require("./default-messages");
function createServiceUnavailableTimeoutError(message = default_messages_1.SERVICE_UNAVAILABLE_ERROR_MESSAGE) {
    return (0, http_errors_1.default)(http_status_codes_1.StatusCodes.SERVICE_UNAVAILABLE, message, {
        expose: true,
    });
}
exports.default = createServiceUnavailableTimeoutError;
//# sourceMappingURL=create-service-unavailable-error.js.map