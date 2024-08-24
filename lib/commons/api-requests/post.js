"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axios_error_handler_1 = __importDefault(require("./axios-error-handler"));
async function post({ url, body, options, }) {
    try {
        const response = await axios_1.default.post(url, body, options);
        const { headers, data } = response;
        return { headers, data };
    }
    catch (error) {
        const { status, data, } = error.response;
        throw (0, axios_error_handler_1.default)({
            status,
            message: data,
        });
    }
}
exports.default = post;
//# sourceMappingURL=post.js.map