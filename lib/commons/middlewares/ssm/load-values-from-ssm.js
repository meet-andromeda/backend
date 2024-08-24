"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssmParameters = void 0;
const ssm_1 = __importDefault(require("@middy/ssm"));
const config_1 = __importDefault(require("../../../config"));
const { envVariablesNames } = config_1.default;
const allParams = {
    [envVariablesNames.walletPrivateKey]: '/backend/wallet-private-key',
    [envVariablesNames.alchemyApiKeyEthereum]: '/backend/alchemy-api-key-ethereum',
    [envVariablesNames.alchemyApiKeyPolygon]: '/backend/alchemy-api-key-polygon',
    [envVariablesNames.infuraProjectId]: '/backend/infura-project-id',
};
exports.ssmParameters = allParams;
function loadValuesFromSsm({ params, }) {
    const fetchData = params.reduce((accumulator, param) => ({
        ...accumulator,
        [param]: allParams[param] === 'undefined' ? undefined : allParams[param],
    }), {});
    const options = {
        fetchData,
        setToContext: true,
        awsClientOptions: {
            region: config_1.default.region,
        },
    };
    return (0, ssm_1.default)(options);
}
exports.default = loadValuesFromSsm;
//# sourceMappingURL=load-values-from-ssm.js.map