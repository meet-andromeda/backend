"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stage_1 = __importDefault(require("./stage"));
const commonEsbuildConfig = {
    watch: {
        pattern: ['src/**/*.ts'],
    },
    sourcemap: true,
    minify: true,
    exclude: ['aws-sdk'],
};
if (stage_1.default === 'local') {
    commonEsbuildConfig.minify = false;
    commonEsbuildConfig.exclude = [];
}
exports.default = commonEsbuildConfig;
//# sourceMappingURL=common-esbuild-config.js.map