"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_cors_1 = __importDefault(require("@middy/http-cors"));
function addPostCors() {
    return (0, http_cors_1.default)({
        methods: 'POST',
    });
}
exports.default = addPostCors;
//# sourceMappingURL=add-post-cors.js.map