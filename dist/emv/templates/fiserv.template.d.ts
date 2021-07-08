import { EmvTemplate } from './emv.template';
import { EmvDto } from './emv.dto';
export declare class FiservTemplate extends EmvTemplate {
    supports: (o: any) => boolean;
    encode: (o: any) => any;
    parse: (o: any) => EmvDto;
}
