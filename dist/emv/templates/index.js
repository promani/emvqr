"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mp_template_1 = require("./mp.template");
const emv_template_1 = require("./emv.template");
const todopago_template_1 = require("./todopago.template");
const spr_template_1 = require("./spr.template");
const fiserv_template_1 = require("./fiserv.template");
const geopagos_template_1 = require("./geopagos.template");
exports.default = [
    new mp_template_1.MpTemplate(),
    new todopago_template_1.TodopagoTemplate(),
    new spr_template_1.SprTemplate(),
    new fiserv_template_1.FiservTemplate(),
    new geopagos_template_1.GeopagosTemplate(),
    new emv_template_1.EmvTemplate(),
];
//# sourceMappingURL=index.js.map