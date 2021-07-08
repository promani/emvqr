import { EmvTemplate } from './emv.template';
import { EmvDto } from './emv.dto';

export class SprTemplate extends EmvTemplate {
  private readonly REVERSE_DOMAIN = 'COM.SPR';

  supports = (o: any): boolean =>
    o[44]?.['00'].toUpperCase() == this.REVERSE_DOMAIN;

  encode = (o: any): any => {
    throw new Error('Not implemented yet');
  }

  parse = (o: any): EmvDto => {
    const result = super.parse(o);

    result['reverse_domain'] = this.REVERSE_DOMAIN;
    result['merchant_tax_id'] = o[50]['01'].replace('-', '').replace('-', '');

    return result;
  };
}
