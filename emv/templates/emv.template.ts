import { TemplateInterface } from './template.interface';
import { Emv } from './emv';

export class EmvTemplate implements TemplateInterface {
  protected readonly ECOMMERCE_CHANNEL = '521';
  protected readonly ISO_CODE_ARS = '032';
  protected readonly ISO_CODE_ARG = 'AR';
  protected readonly CLIENT_REQUEST = '***';

  supports = (o: any): boolean => true;

  encode(o: any, dynamic = true): any {
    return {
      0: '01',
      1: dynamic ? '12' : '11',
      // 02-25 Primitive Payment System Merchant Account Information
      // 26-51 Merchant Account Information Template
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
        // 12-49 RFU for EMVCo
        // 50-99 Payment System specific templates.
      },
      // 65-79 RFU for EMVCo
      // 80-99 Unreserved Templates
    };
  }

  parse(o: any): Emv {
    return {
      dynamic: o[62]?.['06'] != this.CLIENT_REQUEST,
      mcc: o[52],
      amount: parseFloat(o[54]) || 0,
      merchant_name: o[59],
      merchant_city: o[60] || null,
      postal_code: o[61] || null,
      bill_number: o[62]?.['01'] || null,
      store_label: o[62]?.['02'] || null,
      mobile_number: o[62]?.['03'] || null,
      loyalty_number: o[62]?.['04'] || null,
      reference_label: o[62]?.['05'] || null,
      customer_label: o[62]?.['06'] || null,
      terminal_label: o[62]?.['07'] || null,
      purpose: o[62]?.['08'] || null,
      customer_request: o[62]?.['09'] || null,
      merchant_tax_id: o[62]?.['10'] || null,
      merchant_channel: o[62]?.['11'] || null,
    };
  }

  validate = (o: any): boolean => true;
}
