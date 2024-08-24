"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToEmbed = objectToEmbed;
const discordMessageBlueColor = 4237823;
function objectToEmbed({ title, params, }) {
    const keys = Object.keys(params);
    const fields = keys.map((key) => {
        if (!params[key]
            || !(typeof params[key] !== 'string'
                || typeof params[key] !== 'number')) {
            return {
                name: key,
                value: 'undefined',
            };
        }
        const valueAsString = params[key].toString();
        return ({
            name: key,
            value: valueAsString.length > 500
                ? valueAsString.substring(0, 500)
                : valueAsString,
        });
    });
    return {
        title,
        color: discordMessageBlueColor,
        fields,
    };
}
//# sourceMappingURL=object-to-embed.js.map