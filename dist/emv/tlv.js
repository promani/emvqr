"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tlv(data) {
    let result = '';
    for (const val in data) {
        if (!data[val])
            continue;
        if (typeof data[val] === 'object')
            data[val] = tlv(data[val]);
        result +=
            val.toString().padStart(2, '0') +
                data[val].length.toString().padStart(2, '0') +
                data[val];
    }
    return result;
}
exports.default = tlv;
//# sourceMappingURL=tlv.js.map