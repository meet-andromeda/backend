"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDiscordMessage = sendDiscordMessage;
const post_1 = __importDefault(require("../../../commons/api-requests/post"));
const object_to_embed_1 = require("./object-to-embed");
async function sendDiscordMessage({ title, params, url, }) {
    if (!url) {
        return;
    }
    const embed = (0, object_to_embed_1.objectToEmbed)({
        title,
        params: params ?? { body: 'empty params' },
    });
    const body = {
        message: 'Message',
        embeds: [embed],
    };
    await (0, post_1.default)({
        url,
        body,
        options: {},
    });
}
//# sourceMappingURL=send-discord-message.js.map