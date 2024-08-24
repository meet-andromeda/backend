"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceUnavailableTimeoutError = exports.createGatewayTimeoutError = exports.createInternalServerError = exports.createBadGatewayError = void 0;
const create_bad_gateway_error_1 = __importDefault(require("./create-bad-gateway-error"));
exports.createBadGatewayError = create_bad_gateway_error_1.default;
const create_internal_server_error_1 = __importDefault(require("./create-internal-server-error"));
exports.createInternalServerError = create_internal_server_error_1.default;
const create_gateway_timeout_error_1 = __importDefault(require("./create-gateway-timeout-error"));
exports.createGatewayTimeoutError = create_gateway_timeout_error_1.default;
const create_service_unavailable_error_1 = __importDefault(require("./create-service-unavailable-error"));
exports.createServiceUnavailableTimeoutError = create_service_unavailable_error_1.default;
//# sourceMappingURL=index.js.map