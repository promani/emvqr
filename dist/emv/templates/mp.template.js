"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpTemplate = void 0;
const emv_template_1 = require("./emv.template");
class MpTemplate extends emv_template_1.EmvTemplate {
    constructor() {
        super(...arguments);
        this.REVERSE_DOMAIN = 'COM.MERCADOLIBRE';
        this.supports = (o) => { var _a; return ((_a = o[43]) === null || _a === void 0 ? void 0 : _a['00'].toUpperCase()) == this.REVERSE_DOMAIN; };
        this.encode = (o) => {
            const result = super.encode(o, !!o.reference_label);
            result[43] = {
                0: this.REVERSE_DOMAIN,
                2: o.account_type || '3',
                6: o.account_id,
            };
            result[50] = {
                0: o.merchant_tax_id,
            };
            return result;
        };
        this.parse = (o) => {
            var _a, _b, _c;
            const result = super.parse(o);
            result['reverse_domain'] = this.REVERSE_DOMAIN;
            result['account_type'] = (_a = o[43]) === null || _a === void 0 ? void 0 : _a['02'];
            result['account_id'] = (_b = o[43]) === null || _b === void 0 ? void 0 : _b['06'];
            result['merchant_tax_id'] = ((_c = o[50]) === null || _c === void 0 ? void 0 : _c['00']) || null;
            return result;
        };
    }
}
exports.MpTemplate = MpTemplate;
//# sourceMappingURL=mp.template.js.map