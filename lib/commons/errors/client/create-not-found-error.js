"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const default_messages_1 = require("./default-messages");
function createNotFoundError(message = default_messages_1.NOT_FOUND_ERROR_MESSAGE) {
    return new http_errors_1.NotFound(message);
}
exports.default = createNotFoundError;
//# sourceMappingURL=create-not-found-error.js.map