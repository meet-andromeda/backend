"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopicAttributesStatement = exports.setTopicAttributesStatement = exports.queueSubscriptionStatement = exports.sesRoleStatement = exports.s3IamRoleStatement = exports.vpcExecutionStatement = exports.parameterStoreStatement = exports.publishTopicStatement = exports.createTopicStatement = exports.invokeFunctionStatement = exports.xRayIamRoleStatement = void 0;
const x_ray_iam_role_statement_1 = __importDefault(require("./x-ray-iam-role-statement"));
exports.xRayIamRoleStatement = x_ray_iam_role_statement_1.default;
const invoke_function_statement_1 = __importDefault(require("./invoke-function-statement"));
exports.invokeFunctionStatement = invoke_function_statement_1.default;
const create_topic_statement_1 = __importDefault(require("./create-topic-statement"));
exports.createTopicStatement = create_topic_statement_1.default;
const publish_topic_statement_1 = __importDefault(require("./publish-topic-statement"));
exports.publishTopicStatement = publish_topic_statement_1.default;
const ssm_parameter_store_1 = __importDefault(require("./ssm-parameter-store"));
exports.parameterStoreStatement = ssm_parameter_store_1.default;
const vpc_execution_statement_1 = __importDefault(require("./vpc-execution-statement"));
exports.vpcExecutionStatement = vpc_execution_statement_1.default;
const s3_iam_role_statement_1 = __importDefault(require("./s3-iam-role-statement"));
exports.s3IamRoleStatement = s3_iam_role_statement_1.default;
const ses_role_statement_1 = __importDefault(require("./ses-role-statement"));
exports.sesRoleStatement = ses_role_statement_1.default;
const sqs_topic_statement_1 = __importDefault(require("./sqs-topic-statement"));
exports.queueSubscriptionStatement = sqs_topic_statement_1.default;
const set_topic_attributes_statement_1 = __importDefault(require("./set-topic-attributes-statement"));
exports.setTopicAttributesStatement = set_topic_attributes_statement_1.default;
const get_topic_attributes_statement_1 = __importDefault(require("./get-topic-attributes-statement"));
exports.getTopicAttributesStatement = get_topic_attributes_statement_1.default;
//# sourceMappingURL=index.js.map