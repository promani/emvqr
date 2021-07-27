export class Emv {
  dynamic: boolean;
  reverse_domain?: string;
  // About Merchant
  merchant_name: string;
  merchant_city: string;
  merchant_tax_id?: string;
  merchant_channel?: string;
  mcc: string;
  postal_code?: string;
  // About Transaction
  amount: number;
  bill_number?: string;
  reference?: string;
  purpose?: string;
  store?: string;
  terminal?: string;
  // About Customer
  customer?: string;
  mobile_number?: string;
  loyalty_number?: string;
  customer_request?: string;
  // Non-standard
  account_id?: string;
  cvu?: string;
}
