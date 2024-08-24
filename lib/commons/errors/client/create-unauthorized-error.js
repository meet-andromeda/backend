"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const default_messages_1 = require("./default-messages");
function createUnauthorizedError(message = default_messages_1.UNAUTHORIZED_ERROR_MESSAGE) {
    return new http_errors_1.Unauthorized(message);
}
exports.default = createUnauthorizedError;
//# sourceMappingURL=create-unauthorized-error.js.map