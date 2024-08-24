"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = send;
const ethers_1 = require("ethers");
const transfer_erc20_token_1 = __importDefault(require("../helpers/transfer-erc20-token"));
async function send({ walletPrivateKey, web3Provider, destinationAddress, tokenAddress, tokenAmountInWei, }) {
    const signer = new ethers_1.Wallet(walletPrivateKey, web3Provider);
    const transaction = await (0, transfer_erc20_token_1.default)({
        signer,
        destinationAddress,
        tokenAddress,
        tokenAmountInWei,
    });
    return transaction.hash;
}
//# sourceMappingURL=send.js.map