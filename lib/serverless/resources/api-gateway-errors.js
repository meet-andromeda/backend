"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiGatewayErrorsResources = {
    GatewayResponseDefault4XX: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
            ResponseParameters: {
                'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
                'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
            },
            ResponseType: 'DEFAULT_4XX',
            RestApiId: {
                Ref: 'ApiGatewayRestApi',
            },
        },
    },
    GatewayResponseDefault5XX: {
        Type: 'AWS::ApiGateway::GatewayResponse',
        Properties: {
            ResponseParameters: {
                'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
                'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
            },
            ResponseType: 'DEFAULT_5XX',
            RestApiId: {
                Ref: 'ApiGatewayRestApi',
            },
        },
    },
};
exports.default = apiGatewayErrorsResources;
//# sourceMappingURL=api-gateway-errors.js.map