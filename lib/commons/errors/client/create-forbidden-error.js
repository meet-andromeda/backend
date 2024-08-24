"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const default_messages_1 = require("./default-messages");
function createForbiddenError(message = default_messages_1.FORBIDDEN_ERROR_MESSAGE) {
    return new http_errors_1.Forbidden(message);
}
exports.default = createForbiddenError;
//# sourceMappingURL=create-forbidden-error.js.map