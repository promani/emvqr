"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
const crc_1 = require("./crc");
const validate = (text) => {
    const data = text.substring(0, text.length - 4);
    const checksum = text.substring(text.length - 4);
    const hash = crc_1.default(data);
    return hash === checksum.toUpperCase();
};
const read = (text) => {
    const id = text.substring(0, 2);
    const len = parseInt(text.substring(2, 4));
    const data = text.substring(4, len + 4);
    const next = text.substring(len + 4);
    if (!len || !data.length || len !== data.length) {
        return {};
    }
    if (next.length) {
        let value = read(data);
        if (!Object.keys(value).length) {
            value = data;
        }
        return Object.assign({ [id]: value }, read(next));
    }
    return { [id]: data };
};
const decode = (text) => {
    if (!validate(text)) {
        throw new Error('Checksum validation failed.');
    }
    return read(text);
};
exports.decode = decode;
//# sourceMappingURL=decoder.js.map