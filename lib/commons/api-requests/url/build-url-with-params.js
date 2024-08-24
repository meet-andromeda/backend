"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildUrlWithPathParams(path, params = {}) {
    let finalUrl = path;
    Object.entries(params).forEach(([key, value]) => {
        finalUrl = finalUrl.replace(`{${key}}`, value);
    });
    return finalUrl;
}
exports.default = buildUrlWithPathParams;
//# sourceMappingURL=build-url-with-params.js.map