"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ssm_1 = __importDefault(require("@middy/ssm"));
const config_1 = __importDefault(require("../../../config"));
function loadBlockchainProviderKeysFromSsm() {
    const { infuraProjectId, alchemyApiKeyEthereum, alchemyApiKeyPolygon, } = config_1.default.envVariablesNames;
    const options = {
        fetchData: {
            [infuraProjectId]: '/backend/infura-project-id',
            [alchemyApiKeyEthereum]: '/backend/alchemy-api-key-ethereum',
            [alchemyApiKeyPolygon]: '/backend/alchemy-api-key-polygon',
        },
        setToContext: true,
        awsClientOptions: {
            region: config_1.default.region,
        },
        cacheKey: 'blockchain-provider-keys',
        cacheExpiry: 900000,
    };
    return (0, ssm_1.default)(options);
}
exports.default = loadBlockchainProviderKeysFromSsm;
//# sourceMappingURL=load-blockchain-provider-keys-from-ssm.js.map