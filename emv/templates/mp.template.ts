import { EmvTemplate } from './emv.template';
import { Emv } from './emv';

export class MpTemplate extends EmvTemplate {
  private readonly REVERSE_DOMAIN = 'COM.MERCADOLIBRE';

  supports = (o: any): boolean =>
    o[43]?.['00'].toUpperCase() == this.REVERSE_DOMAIN;

  encode = (o: any): any => {
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

  parse = (o: any): Emv => {
    const result = super.parse(o);

    result['reverse_domain'] = this.REVERSE_DOMAIN;
    result['account_type'] = o[43]?.['02'];
    result['account_id'] = o[43]?.['06'];
    result['merchant_tax_id'] = o[50]?.['00'] || null;

    return result;
  };
}
