"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
async function getGasConfiguration({ signer, gasPrice, gasLimit, }) {
    let estimatedGasPrice = gasPrice;
    if (!gasPrice) {
        estimatedGasPrice = await signer.getGasPrice();
    }
    if (gasLimit) {
        return {
            gasPrice: ethers_1.BigNumber.from(estimatedGasPrice),
            gasLimit: ethers_1.BigNumber.from(gasLimit),
        };
    }
    const estimatedGasLimit = ethers_1.BigNumber.from('2500000');
    return {
        gasPrice: ethers_1.BigNumber.from(estimatedGasPrice),
        gasLimit: estimatedGasLimit,
    };
}
exports.default = getGasConfiguration;
//# sourceMappingURL=get-gas-configuration.js.map