"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const default_messages_1 = require("./default-messages");
function createBadRequestError(errorOrMessage = default_messages_1.BAD_REQUEST_ERROR_MESSAGE) {
    const body = typeof errorOrMessage === 'string'
        ? errorOrMessage
        : {
            ...errorOrMessage,
            message: errorOrMessage.message ?? default_messages_1.BAD_REQUEST_ERROR_MESSAGE,
        };
    return (0, http_errors_1.default)(http_status_codes_1.StatusCodes.BAD_REQUEST, body);
}
exports.default = createBadRequestError;
//# sourceMappingURL=create-bad-request-error.js.map