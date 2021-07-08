"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmvTemplate = void 0;
class EmvTemplate {
    constructor() {
        this.ECOMMERCE_CHANNEL = '521';
        this.ISO_CODE_ARS = '032';
        this.ISO_CODE_ARG = 'AR';
        this.CLIENT_REQUEST = '***';
        this.supports = (o) => true;
    }
    encode(o, dynamic = true) {
        return {
            0: '01',
            1: dynamic ? '12' : '11',
            52: o.mcc,
            53: this.ISO_CODE_ARS,
            58: this.ISO_CODE_ARG,
            59: o.merchant_name,
            60: o.merchant_city,
            61: o.postal_code,
            62: {
                1: o.bill_number,
                2: o.mobile_number,
                3: o.store_label,
                4: o.loyalty_number,
                5: o.reference_label,
                6: o.customer_label,
                7: o.terminal_label,
                8: o.purpose,
                9: o.customer_request,
                10: o.merchant_tax_id,
                11: o.merchant_channel,
            },
        };
    }
    parse(o) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return {
            dynamic: ((_a = o[62]) === null || _a === void 0 ? void 0 : _a['06']) != this.CLIENT_REQUEST,
            mcc: o[52] || null,
            amount: parseFloat(o[54]) || 0,
            merchant_name: o[59] || null,
            merchant_city: o[60] || null,
            postal_code: o[61] || null,
            bill_number: ((_b = o[62]) === null || _b === void 0 ? void 0 : _b['01']) || null,
            store_label: ((_c = o[62]) === null || _c === void 0 ? void 0 : _c['02']) || null,
            mobile_number: ((_d = o[62]) === null || _d === void 0 ? void 0 : _d['03']) || null,
            loyalty_number: ((_e = o[62]) === null || _e === void 0 ? void 0 : _e['04']) || null,
            reference_label: ((_f = o[62]) === null || _f === void 0 ? void 0 : _f['05']) || null,
            customer_label: ((_g = o[62]) === null || _g === void 0 ? void 0 : _g['06']) || null,
            terminal_label: ((_h = o[62]) === null || _h === void 0 ? void 0 : _h['07']) || null,
            purpose: ((_j = o[62]) === null || _j === void 0 ? void 0 : _j['08']) || null,
            customer_request: ((_k = o[62]) === null || _k === void 0 ? void 0 : _k['09']) || null,
            merchant_tax_id: ((_l = o[62]) === null || _l === void 0 ? void 0 : _l['10']) || null,
            merchant_channel: ((_m = o[62]) === null || _m === void 0 ? void 0 : _m['11']) || null,
        };
    }
}
exports.EmvTemplate = EmvTemplate;
//# sourceMappingURL=emv.template.js.map