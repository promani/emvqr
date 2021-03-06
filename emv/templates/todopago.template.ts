import { EmvTemplate } from './emv.template';
import { Emv } from './emv';

export class TodopagoTemplate extends EmvTemplate {
  private readonly REVERSE_DOMAIN = 'COM.TODOPAGO';

  supports = (o: any): boolean =>
    o[48]?.['00'].toUpperCase() == this.REVERSE_DOMAIN;

  encode = (o: any): any => { throw new Error('Not implemented yet.') }

  parse = (o: any): Emv => {
    const result = super.parse(o);

    result.reverse_domain = this.REVERSE_DOMAIN;
    result.merchant_tax_id = o[50]['00'];

    return result;
  };
}
