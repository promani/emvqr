"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeopagosTemplate = void 0;
const emv_template_1 = require("./emv.template");
class GeopagosTemplate extends emv_template_1.EmvTemplate {
    constructor() {
        super(...arguments);
        this.REVERSE_DOMAIN = 'COOP.SIPAGO';
        this.supports = (o) => { var _a; return ((_a = o[30]) === null || _a === void 0 ? void 0 : _a['00'].toUpperCase()) == this.REVERSE_DOMAIN; };
        this.encode = (o) => {
            throw new Error('Not implemented yet');
        };
        this.parse = (o) => {
            const result = super.parse(o);
            result['reverse_domain'] = this.REVERSE_DOMAIN;
            result['merchant_tax_id'] = o[50]['00'];
            return result;
        };
    }
}
exports.GeopagosTemplate = GeopagosTemplate;
//# sourceMappingURL=geopagos.template.js.map