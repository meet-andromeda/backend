"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handler_resolver_1 = require("../../commons/handler-resolver");
const handlerConfig = {
    handler: `${(0, handler_resolver_1.handlerPath)(__dirname)}/handler.main`,
    timeout: 15,
    events: [
        {
            http: {
                method: 'post',
                path: '/listener',
                cors: true,
                request: {},
            },
        },
    ],
};
exports.default = handlerConfig;
//# sourceMappingURL=index.js.map