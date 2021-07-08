"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.parse = void 0;
const templates_1 = require("./templates");
const tlv_1 = require("./tlv");
const crc_1 = require("./crc");
const decoder = require("./decoder");
const CRC_TL = '6304';
function parse(qr) {
    qr =
        qr.substring(0, qr.length - 4) + qr.substring(qr.length - 4).toUpperCase();
    const decoded = decoder.decode(qr);
    const template = templates_1.default.find((t) => t.supports(decoded));
    return template.parse(decoded);
}
exports.parse = parse;
function encode(data, template) {
    if (!template)
        template = templates_1.default[0];
    const result = tlv_1.default(template.encode(data)) + CRC_TL;
    return result + crc_1.default(result);
}
exports.encode = encode;
//# sourceMappingURL=emv.adapter.js.map