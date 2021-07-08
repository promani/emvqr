import { EmvDto } from './emv.dto';

export interface TemplateInterface {
  supports(o: any): boolean;
  encode(o: any, dynamic?: boolean): any;
  parse(o: any): EmvDto;
}
