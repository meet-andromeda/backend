"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const abi_1 = __importDefault(require("../abi"));
const get_gas_configuration_1 = __importDefault(require("../../../helpers/get-gas-configuration"));
async function transferErc20Token({ signer, destinationAddress, tokenAddress, tokenAmountInWei, customGasPrice, }) {
    const tokenConnection = new ethers_1.ethers.Contract(tokenAddress, abi_1.default, signer);
    const gasConfiguration = await (0, get_gas_configuration_1.default)({
        signer,
        gasPrice: customGasPrice,
    });
    const response = await tokenConnection.transfer(destinationAddress, tokenAmountInWei, gasConfiguration);
    return response;
}
exports.default = transferErc20Token;
//# sourceMappingURL=transfer-erc20-token.js.map