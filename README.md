# EMVQR
Javascript library to parse and encode EMV QR codes. Based in [EMVCo Merchant Presented QR Specification v1.1](https://www.emvco.com/terms-of-use/?u=/wp-content/uploads/documents/EMVCo-Merchant-Presented-QR-Specification-v1.1.pdf).

## How to parse
```javascript
const emvqr = require('@promani/emvqr');

const example = '00020101021229300012D156000000000510A93FO3230Q31280012D15600000001030812345678520441115802CN5914BEST TRANSPORT6007BEIJING64200002ZH0104最佳运输0202北京540523.7253031565502016233030412340603***0708A60086670902ME91320016A0112233449988770708123456786304A13A';

const result = emvqr.decode(example);
```

### Result
```javascript
{
    amount: 23.72,
    customer_label: '***',
    customer_request: 'ME',
    mcc: '4111',
    merchant_city: 'BEIJING',
    merchant_name: 'BEST TRANSPORT',
    mobile_number: '1234',
    terminal_label: 'A6008667',
}
```

## How to encode
```javascript
const emvqr = require('@promani/emvqr');

const data = {
    account_id: 'fa7070cc-266c-44aa-aa0c-5d9900a99b13',
    merchant_tax_id: '20162475860',
    mcc: '9700',
    merchant_name: 'CLAUDIO ARIEL ARONSON',
    merchant_city: 'Ciudad Autonoma',
    reference_label: '***',
};

const result = emvqr.encode(data);
```

### Result
```
00020101021243650016COM.MERCADOLIBRE020130636fa7070cc-266c-44aa-aa0c-5d9900a99b1350150011201624758605204970053030325802AR5921CLAUDIO ARIEL ARONSON6015Ciudad Autonoma62070503***6304FCAA
```

## Custom templates
You can develop a custom QR template extending the class EmvTemplate and overriding the respective properties.
For example:

```javascript
import { EmvTemplate, Emv } from '@promani/emvqr';

export class OldWalletTemplate extends EmvTemplate {
  private readonly REVERSE_DOMAIN = 'COM.OLD-WALLET';

  supports = (o: any): boolean => o[26]?.['00'] == this.REVERSE_DOMAIN;

  encode = (o: any): any => {
    // You can call the base template or override it all (we no recomend that).
    const result = super.encode(o, true);
    result[26] = {
      0: this.REVERSE_DOMAIN,
      1: o.account_id,
    };
    result[62] = {
      5: o.reference_label || null,
      10: o.merchant_tax_id,
      11: this.ECOMMERCE_CHANNEL,
    };
    
    return result;
  };

  parse = (o: any): Emv => {
    // You can call the base template or override it all.
    const result = super.parse(o);

    result['reverse_domain'] = this.REVERSE_DOMAIN;
    result['merchant_tax_id'] = o[50]?.['00'] || null;

    return result;
  };
}
```

To use your custom template:
```javascript
import { OldWalletTemplate } from '../your-path/old-wallet.template';

const result = emvqr.encode(data, new OldWalletTemplate());
```
