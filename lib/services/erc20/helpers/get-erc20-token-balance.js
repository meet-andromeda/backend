"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const server_1 = require("../../../commons/errors/server");
const abi_1 = __importDefault(require("../abi"));
const logger_1 = __importDefault(require("../../../commons/logger"));
const connect_to_contract_1 = __importDefault(require("../../../helpers/connect-to-contract"));
async function getErc20TokenBalance({ provider, tokenAddress, userAddress, }) {
    try {
        const tokenConnection = (0, connect_to_contract_1.default)({
            contractAddress: tokenAddress,
            provider,
            contractAbi: abi_1.default,
        });
        const balanceInWei = await tokenConnection.balanceOf(userAddress);
        return balanceInWei.toString();
    }
    catch (error) {
        if ((0, http_errors_1.isHttpError)(error)) {
            throw error;
        }
        logger_1.default.error({
            name: 'get_erc_20_token_balance_failed',
            error,
        });
        throw (0, server_1.createInternalServerError)();
    }
}
exports.default = getErc20TokenBalance;
//# sourceMappingURL=get-erc20-token-balance.js.map