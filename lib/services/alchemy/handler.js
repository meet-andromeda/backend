"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_error_handler_1 = __importDefault(require("@middy/http-error-handler"));
const http_status_codes_1 = require("http-status-codes");
const add_post_cors_1 = __importDefault(require("../../commons/middlewares/cors/add-post-cors"));
const middlewares = [
    (0, add_post_cors_1.default)(),
    (0, http_error_handler_1.default)(),
];
exports.main = (0, core_1.default)(async () => ({
    statusCode: http_status_codes_1.StatusCodes.OK,
    body: {},
})).use(middlewares);
//# sourceMappingURL=handler.js.map