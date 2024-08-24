"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_error_handler_1 = __importDefault(require("@middy/http-error-handler"));
const http_status_codes_1 = require("http-status-codes");
const add_post_cors_1 = __importDefault(require("../../../../commons/middlewares/cors/add-post-cors"));
const send_1 = require("../../actions/send");
const load_values_from_ssm_1 = __importDefault(require("../../../../commons/middlewares/ssm/load-values-from-ssm"));
const config_1 = __importDefault(require("../../../../config"));
const load_blockchain_provider_keys_from_ssm_1 = __importDefault(require("../../../../commons/middlewares/ssm/load-blockchain-provider-keys-from-ssm"));
const { walletPrivateKey, } = config_1.default.envVariablesNames;
const middlewares = [
    (0, add_post_cors_1.default)(),
    (0, load_values_from_ssm_1.default)({
        params: [
            walletPrivateKey,
        ],
    }),
    (0, load_blockchain_provider_keys_from_ssm_1.default)(),
    (0, http_error_handler_1.default)(),
];
exports.main = (0, core_1.default)(async (event, context) => {
    const { body, provider, } = event;
    const requestBody = JSON.parse(body);
    const hash = await (0, send_1.send)({
        walletPrivateKey: context[walletPrivateKey],
        web3Provider: provider,
        destinationAddress: requestBody.destinationAddress,
        tokenAddress: requestBody.tokenAddress,
        tokenAmountInWei: requestBody.tokenAmountInWei,
    });
    return {
        statusCode: http_status_codes_1.StatusCodes.OK,
        body: { hash },
    };
}).use(middlewares);
//# sourceMappingURL=handler.js.map