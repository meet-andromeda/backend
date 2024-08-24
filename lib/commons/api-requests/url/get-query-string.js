"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getQueryString(params) {
    const queryString = Object.entries(params)
        .map(([key, value]) => {
        if (value !== undefined && value != null) {
            return `${key}=${encodeURIComponent(value)}`;
        }
        return '';
    })
        .join('&');
    return queryString;
}
exports.default = getQueryString;
//# sourceMappingURL=get-query-string.js.map