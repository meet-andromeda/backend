"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../errors/client");
const server_1 = require("../errors/server");
function axiosErrorHandler({ status, message, }) {
    if (status.toString()[0] === '4') {
        return (0, client_1.createBadRequestError)(message);
    }
    return (0, server_1.createInternalServerError)(message);
}
exports.default = axiosErrorHandler;
//# sourceMappingURL=axios-error-handler.js.map