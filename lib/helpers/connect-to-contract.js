"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contracts_1 = require("@ethersproject/contracts");
const server_1 = require("../commons/errors/server");
function connectToContract({ contractAddress, provider, signer, contractAbi, }) {
    if ((!provider && !signer) || (provider && signer)) {
        throw (0, server_1.createInternalServerError)('Missing provider or signer or both were sent');
    }
    try {
        const connection = signer || provider;
        return new contracts_1.Contract(contractAddress, contractAbi, connection);
    }
    catch (error) {
        throw (0, server_1.createInternalServerError)('Contract connection failed');
    }
}
exports.default = connectToContract;
//# sourceMappingURL=connect-to-contract.js.map