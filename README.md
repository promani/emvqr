# emvqr
Typescript library to parse and encode EMV QR codes.

## how to parse
```
const emvqr = require('@promani/emvqr');

const example = '00020101021229300012D156000000000510A93FO3230Q31280012D15600000001030812345678520441115802CN5914BEST TRANSPORT6007BEIJING64200002ZH0104最佳运输0202北京540523.7253031565502016233030412340603***0708A60086670902ME91320016A0112233449988770708123456786304A13A';

const result = emvqr.decode(example);
console.log('result', result);
```

## how to encode
```
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
    
console.log('result', result);
```