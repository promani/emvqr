import { EmvTemplate } from './emv.template';
import { Emv } from './emv';

export class FiservTemplate extends EmvTemplate {
  supports = (o: any): boolean => o[80] || false;

  encode = (o: any): any => {
    throw new Error('Not implemented yet');
  }

  parse = (o: any): Emv => {
    const result = super.parse(o);

    result['merchant_tax_id'] = o[50]['00'].replace('-', '').replace('-', '');
    result['cvu'] = o[51]['00'];

    return result;
  };
}
