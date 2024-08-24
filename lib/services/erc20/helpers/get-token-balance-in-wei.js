"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_erc20_token_balance_1 = __importDefault(require("./get-erc20-token-balance"));
async function getTokenBalanceInWei({ provider, tokenAddress, userAddress, }) {
    const balanceInWei = await (0, get_erc20_token_balance_1.default)({
        provider,
        tokenAddress,
        userAddress,
    });
    return balanceInWei.toString();
}
exports.default = getTokenBalanceInWei;
//# sourceMappingURL=get-token-balance-in-wei.js.map