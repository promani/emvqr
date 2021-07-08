"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiservTemplate = void 0;
const emv_template_1 = require("./emv.template");
class FiservTemplate extends emv_template_1.EmvTemplate {
    constructor() {
        super(...arguments);
        this.supports = (o) => o[80] || false;
        this.encode = (o) => {
            throw new Error('Not implemented yet');
        };
        this.parse = (o) => {
            const result = super.parse(o);
            result['merchant_tax_id'] = o[50]['00'].replace('-', '').replace('-', '');
            result['cvu'] = o[51]['00'];
            return result;
        };
    }
}
exports.FiservTemplate = FiservTemplate;
//# sourceMappingURL=fiserv.template.js.map