import { Emv } from './emv';

export interface TemplateInterface {
  supports(o: any): boolean;
  encode(o: any, dynamic?: boolean): any;
  parse(o: any): Emv;
  validate(o: any): boolean;
}
